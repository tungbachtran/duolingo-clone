// pages/lesson-exercises.tsx
import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLessonExercises } from '../services';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import type {
  Exercise,
  ExerciseResult,
  UserAnswer,
  Answer,
  MatchingAnswer,
  MultipleChoiceQuestion,
  OrderingQuestion,
  GapQuestion
} from '../types/exercise.types';
import MultipleChoiceCard from '../components/multiple-choice-card';
import OrderingCard from '../components/ordering-card';
import MatchingCard from '../components/matching-card';
import GapCard from '../components/gap-card';
import ResultScreen from '../components/result-screen';
import ProgressBar from '../components/progress-bar';
import { useProgress } from '@/context/progress.context';
import { ProgressActionType } from '@/reducer/progress.reducer';
import { ROUTE } from '@/features/authentication/constants';
import { useUserProgress } from '@/context/user-progress.context';
import { updateUserProgress, type UpdateUserProgressForm } from '@/features/dashboard/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCurrentCourseId } from '@/context/current-course-id.context';
import { postUserMistake, type PostUserMistakeForm } from '@/features/wrong-answer/service';
import correctMp3 from '@/assets/audio/correct.mp3';
import wrongMp3 from '@/assets/audio/wrong.mp3';
const LessonExercises = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { courseId } = useUserProgress();
  const { state: currentCourseId } = useCurrentCourseId();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<Answer | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [showResult, setShowResult] = useState(false);
  const [retryQuestions, setRetryQuestions] = useState<Exercise[]>([]);
  const [isRetryPhase, setIsRetryPhase] = useState(false);
  const { state, dispatch } = useProgress();
  const queryClient = useQueryClient();

  const form: UpdateUserProgressForm = {
    lessonId: state.lessonId,
    unitId: state.unitId,
    courseId: currentCourseId.courseId.length > 0 ? currentCourseId.courseId : courseId,
    experiencePoint: state.experiencePoint,
    heartCount: state.heartCount
  }
  const mutate = useMutation({ mutationFn: (form: UpdateUserProgressForm) => updateUserProgress(form) })
  const mistakeMutation = useMutation({ mutationFn: (form: PostUserMistakeForm) => postUserMistake(form) })
  const cid = currentCourseId.courseId.length > 0 ? currentCourseId.courseId : courseId;
  useEffect(() => {
    if (lessonId) {
      loadExercises();
    }
  }, [lessonId]);

  const correctSound = useRef<HTMLAudioElement | null>(null);
  const wrongSound = useRef<HTMLAudioElement | null>(null);
  const playSound = async (audio: HTMLAudioElement | null) => {
    if (!audio) return;
    try {
      audio.currentTime = 0;
      await audio.play();
    } catch (err) {
      console.warn('Cannot play audio:', err);
    }
  };
  useEffect(() => {
    correctSound.current = new Audio(correctMp3);
    wrongSound.current = new Audio(wrongMp3);
    correctSound.current.preload = 'auto';
    wrongSound.current.preload = 'auto';
  }, []);
  const loadExercises = async () => {
    try {
      setLoading(true);
      const data = await getLessonExercises(lessonId!);
      setExercises(data.sort((a, b) => a.displayOrder - b.displayOrder));
      setStartTime(Date.now());
      setQuestionStartTime(Date.now());
    } catch (error) {
      console.error('Error loading exercises:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkAnswer = (answer: Answer): boolean => {
    const currentExercise = isRetryPhase ? retryQuestions[currentIndex] : exercises[currentIndex];

    switch (currentExercise.typeQuestion) {
      case 'multiple_choice': {
        if (typeof answer !== 'string') return false;
        return answer === currentExercise.correctAnswer;
      }

      case 'ordering': {
        if (!Array.isArray(answer) || answer.some(item => typeof item !== 'string')) return false;
        return answer.join(' ') === currentExercise.exactFragmentText;
      }

      case 'matching': {
        if (!Array.isArray(answer)) return false;
        const pairs = answer as MatchingAnswer[];
        return pairs.every((pair) => pair.leftId === pair.rightId);
      }

      case 'gap': {
        if (typeof answer !== 'string') return false;
        return answer.toLowerCase().trim() === currentExercise.correctAnswer.toLowerCase().trim();
      }

      default:
        return false;
    }
  };

  const handleCheck = async () => {

    if (!currentAnswer) return;

    const currentExercise = isRetryPhase ? retryQuestions[currentIndex] : exercises[currentIndex];
    const correct = checkAnswer(currentAnswer);
    if (correct) playSound(correctSound.current);
    else playSound(wrongSound.current);
    const timeSpent = Date.now() - questionStartTime;

    setIsCorrect(correct);
    setIsChecking(true);

    const userAnswer: UserAnswer = {
      questionId: currentExercise._id,
      answer: currentAnswer,
      isCorrect: correct,
      timeSpent,
    };

    setUserAnswers([...userAnswers, userAnswer]);

    if (!correct && !isRetryPhase) {

      setRetryQuestions([...retryQuestions, currentExercise]);
      if (state.heartCount)
        dispatch({ type: ProgressActionType.SET_HEART_COUNT, payload: state.heartCount - 1 })
    }
  };

  const handleContinue = async () => {
    if (state.heartCount === 0) {
      await mutate.mutateAsync(form)
      await queryClient.invalidateQueries({ queryKey: ['unitsAndLessons', cid] });
      await queryClient.refetchQueries({ queryKey: ['unitsAndLessons', cid] });
      if (retryQuestions.length > 0) {
        mistakeMutation.mutate({ wrongAnswer: retryQuestions.map(i => i._id) });
      }
      navigate(`/dashboard/course/${currentCourseId.courseId.length > 0 ? currentCourseId.courseId : courseId}`);

    }
    const totalQuestions = isRetryPhase ? retryQuestions.length : exercises.length;

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentAnswer(null);
      setIsChecking(false);
      setIsCorrect(null);
      setQuestionStartTime(Date.now());
    } else {
      if (!isRetryPhase && retryQuestions.length > 0) {
        // Start retry phase
        setIsRetryPhase(true);
        setCurrentIndex(0);
        setCurrentAnswer(null);
        setIsChecking(false);
        setIsCorrect(null);
        setQuestionStartTime(Date.now());
      } else {
        // Show results
        setShowResult(true);
      }
    }
  };

  const getCorrectAnswerDisplay = (): string => {
    const currentExercise = isRetryPhase ? retryQuestions[currentIndex] : exercises[currentIndex];

    if (!currentExercise) return '';

    if (currentExercise.typeQuestion === 'multiple_choice' || currentExercise.typeQuestion === 'gap') {
      return currentExercise.correctAnswer;
    }
    if (currentExercise.typeQuestion === 'ordering') {
      return currentExercise.exactFragmentText;
    }
    return '';
  };

  const renderExercise = () => {
    const currentExercise = isRetryPhase ? retryQuestions[currentIndex] : exercises[currentIndex];

    if (!currentExercise) return null;

    switch (currentExercise.typeQuestion) {
      case 'multiple_choice':
        return (
          <MultipleChoiceCard
            question={currentExercise as MultipleChoiceQuestion}
            selectedAnswer={typeof currentAnswer === 'string' ? currentAnswer : null}
            onAnswerChange={setCurrentAnswer}
            isChecking={isChecking}
            isCorrect={isCorrect}
          />
        );

      case 'ordering':
        return (
          <OrderingCard
            question={currentExercise as OrderingQuestion}
            orderedFragments={Array.isArray(currentAnswer) && currentAnswer.every(item => typeof item === 'string')
              ? currentAnswer as string[]
              : null}
            onOrderChange={setCurrentAnswer}
            isChecking={isChecking}
            isCorrect={isCorrect}
          />
        );

      case 'matching':
        return (
          <MatchingCard
            question={currentExercise}
            matches={Array.isArray(currentAnswer) ? currentAnswer as MatchingAnswer[] : null}
            onMatchChange={setCurrentAnswer}
            isChecking={isChecking}
            isCorrect={isCorrect}
          />
        );

      case 'gap':
        return (
          <GapCard
            question={currentExercise as GapQuestion}
            answer={typeof currentAnswer === 'string' ? currentAnswer : null}
            onAnswerChange={setCurrentAnswer}
            isChecking={isChecking}
            isCorrect={isCorrect}
          />
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
      </div>
    );
  }

  if (exercises.length === 0 && !loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <p className="text-xl text-gray-600 mb-4">Không có bài tập nào</p>
        <Button onClick={() => { if (courseId) { navigate(ROUTE.DASHBOARD.replace(":courseId", courseId)); } }}>Quay lại</Button>
      </div>
    );
  }


  if (showResult) {
    const result: ExerciseResult = {
      totalQuestions: exercises.length,
      correctAnswers: userAnswers.filter(a => a.isCorrect).length,
      incorrectQuestions: retryQuestions,
      totalTime: Date.now() - startTime,
      userAnswers,
    };

    return <ResultScreen result={result} onRetry={() => navigate(0)} onExit={() => navigate(-1)} />;
  }

  const totalQuestions = isRetryPhase ? retryQuestions.length : exercises.length;
  const progress = totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => { if (courseId) { navigate(ROUTE.DASHBOARD.replace(":courseId", courseId)); } }}
              className="text-gray-600 hover:text-gray-900"
            >
              ✕
            </Button>
            <span className="text-sm font-medium text-gray-600">
              {isRetryPhase ? 'Làm lại câu sai' : 'Bài tập'}
            </span>
            <div className="w-8" />
          </div>
          <ProgressBar progress={progress} />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          {renderExercise()}
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          {isChecking ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isCorrect ? (
                  <>
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-green-600 text-lg">Tuyệt vời!</h3>
                      <p className="text-sm text-gray-600">Câu trả lời chính xác</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                      <XCircle className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-red-600 text-lg">Chưa đúng!</h3>
                      <p className="text-sm text-gray-600">Đáp án đúng: {getCorrectAnswerDisplay()}</p>
                    </div>
                  </>
                )}
              </div>
              <Button
                onClick={handleContinue}
                className={`px-8 py-6 text-lg font-bold ${isCorrect
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-red-500 hover:bg-red-600'
                  }`}
              >
                Tiếp tục
              </Button>
            </div>
          ) : (
            <div className="flex justify-end">
              <Button
                onClick={handleCheck}
                disabled={!currentAnswer}
                className="px-8 py-6 text-lg font-bold bg-green-500 hover:bg-green-600 disabled:bg-gray-300"
              >
                Kiểm tra
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonExercises;
