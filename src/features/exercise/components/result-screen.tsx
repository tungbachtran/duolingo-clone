// components/exercises/ResultScreen.tsx
import type { ExerciseResult } from '../types/exercise.types'; 
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Clock, Target, XCircle } from 'lucide-react';
import { useProgress } from '@/context/progress.context';
import { useMutation } from '@tanstack/react-query';
import { updateUserProgress, type UpdateUserProgressForm } from '@/features/dashboard/services';
import { postUserMistake, type PostUserMistakeForm } from '@/wrong-answer/service';
import { useNavigate } from 'react-router-dom';
import { useUserProgress } from '@/context/user-progress.context';
import { ROUTE } from '@/features/authentication/constants';

interface Props {
  result: ExerciseResult;
  onRetry: () => void;
  onExit: () => void;
}

const ResultScreen = ({ result, onRetry }: Props) => {
  const percentage = Math.round((result.correctAnswers / result.totalQuestions) * 100);
  const minutes = Math.floor(result.totalTime / 60000);
  const seconds = Math.floor((result.totalTime % 60000) / 1000);
  const navigate = useNavigate();
  const{courseId} = useUserProgress();

  const {state } = useProgress();
  const form:UpdateUserProgressForm = {
    lessonId:state.lessonId,
    unitId:state.unitId,
    courseId:courseId,
    experiencePoint:state.experiencePoint,
    heartCount:state.heartCount
  }
  
  const {mutate} = useMutation({mutationFn:(form:UpdateUserProgressForm)=>updateUserProgress(form)})
  const mistakeMutation = useMutation({mutationFn:(form:PostUserMistakeForm) => postUserMistake(form)})
  const handleCompleteLesson = async ()=>{
    await mutate(form)
    if(result.incorrectQuestions.length > 0){
      const wrongAnswer = result.incorrectQuestions.map(item=>item._id);
      const form ={
        wrongAnswer : wrongAnswer
      }
      mistakeMutation.mutate(form)
    }
    { if (courseId) { navigate(ROUTE.DASHBOARD.replace(":courseId", courseId)); } }
  }
  const getPerformanceMessage = () => {
    if (percentage === 100) return { text: 'Hoàn hảo!', color: 'text-yellow-600', emoji: '🏆' };
    if (percentage >= 80) return { text: 'Xuất sắc!', color: 'text-green-600', emoji: '🎉' };
    if (percentage >= 60) return { text: 'Tốt lắm!', color: 'text-blue-600', emoji: '👏' };
    return { text: 'Cố gắng lên!', color: 'text-orange-600', emoji: '💪' };
  };

  const performance = getPerformanceMessage();

  const incorrectByType = result.incorrectQuestions.reduce((acc, q) => {
    acc[q.typeQuestion] = (acc[q.typeQuestion] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const typeNames: Record<string, string> = {
    multiple_choice: 'Trắc nghiệm',
    ordering: 'Sắp xếp câu',
    matching: 'Ghép cặp',
    gap: 'Điền từ',
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8 shadow-2xl">
        <div className="text-center space-y-6">
          {/* Trophy Icon */}
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-yellow-100 flex items-center justify-center">
              <span className="text-6xl">{performance.emoji}</span>
            </div>
          </div>

          {/* Title */}
          <div>
            <h1 className={`text-4xl font-bold ${performance.color} mb-2`}>
              {performance.text}
            </h1>
            <p className="text-gray-600 text-lg">Bạn đã hoàn thành bài tập!</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6">
            <div className="bg-blue-50 p-6 rounded-xl">
              <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-blue-600">{percentage}%</div>
              <div className="text-sm text-gray-600">Độ chính xác</div>
            </div>

            <div className="bg-green-50 p-6 rounded-xl">
              <Trophy className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-green-600">
                {result.correctAnswers}/{result.totalQuestions}
              </div>
              <div className="text-sm text-gray-600">Câu đúng</div>
            </div>

            <div className="bg-purple-50 p-6 rounded-xl">
              <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-purple-600">
                {minutes}:{seconds.toString().padStart(2, '0')}
              </div>
              <div className="text-sm text-gray-600">Thời gian</div>
            </div>
          </div>

          {/* Incorrect Questions Summary */}
          {result.incorrectQuestions.length > 0 && (
            <div className="bg-red-50 p-6 rounded-xl text-left">
              <div className="flex items-center gap-2 mb-4">
                <XCircle className="w-6 h-6 text-red-600" />
                <h3 className="font-bold text-red-600 text-lg">Các câu cần ôn lại</h3>
              </div>
              <div className="space-y-2">
                {Object.entries(incorrectByType).map(([type, count]) => (
                  <div key={type} className="flex justify-between items-center">
                    <span className="text-gray-700">{typeNames[type]}</span>
                    <span className="font-bold text-red-600">{count} câu</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              onClick={handleCompleteLesson}
              variant="outline"
              className="flex-1 py-6 text-lg font-bold"
            >
              Tiếp theo
            </Button>
            <Button
              onClick={onRetry}
              className="flex-1 py-6 text-lg font-bold bg-green-500 hover:bg-green-600"
            >
              Làm lại
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ResultScreen;
