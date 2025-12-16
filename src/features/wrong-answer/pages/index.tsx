
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUserMistake } from '../service';

import type { UserMistakeItem } from '../service';
import { Button } from '@/components/ui/button';
import MultipleChoiceCard from '@/features/exercise/components/multiple-choice-card';
import OrderingCard from '@/features/exercise/components/ordering-card';
import MatchingCard from '@/features/exercise/components/matching-card';
import GapCard from '@/features/exercise/components/gap-card';
import { Loader2 } from 'lucide-react';
import type { Answer, Exercise, GapQuestion, MatchingAnswer, MultipleChoiceQuestion, OrderingQuestion } from '@/features/exercise/types/exercise.types';

const UserMistakesPage = () => {
    const { data, isLoading, isError } = useQuery<UserMistakeItem[]>({
        queryKey: ['userMistakes'],
        queryFn: getUserMistake,
    });

    const [selectedQuestion, setSelectedQuestion] = useState<Exercise | null>(null);
    const [currentAnswer, setCurrentAnswer] = useState<Answer | null>(null);
    const [isChecking, setIsChecking] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    // Reset state khi chọn câu mới
    useEffect(() => {
        setCurrentAnswer(null);
        setIsChecking(false);
        setIsCorrect(null);
    }, [selectedQuestion?._id]);

    const checkAnswer = (question: Exercise, answer: Answer): boolean => {
        switch (question.typeQuestion) {
            case 'multiple_choice': {
                if (typeof answer !== 'string') return false;
                return answer === question.correctAnswer;
            }
            case 'ordering': {
                if (!Array.isArray(answer) || answer.some((item) => typeof item !== 'string'))
                    return false;
                // exactFragmentText là string nguyên câu
                return answer.join(' ') === question.exactFragmentText;
            }
            case 'matching': {
                if (!Array.isArray(answer)) return false;
                const pairs = answer as MatchingAnswer[];
                return pairs.every((pair) => pair.leftId === pair.rightId);
            }
            case 'gap': {
                if (typeof answer !== 'string') return false;
                return (
                    answer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim()
                );
            }
            default:
                return false;
        }
    };

    const handleCheck = () => {
        if (!selectedQuestion || !currentAnswer) return;
        const correct = checkAnswer(selectedQuestion, currentAnswer);
        setIsCorrect(correct);
        setIsChecking(true);
    };

    const getCorrectAnswerDisplay = (): string => {
        if (!selectedQuestion) return '';
        if (
            selectedQuestion.typeQuestion === 'multiple_choice' ||
            selectedQuestion.typeQuestion === 'gap'
        ) {
            return selectedQuestion.correctAnswer;
        }
        if (selectedQuestion.typeQuestion === 'ordering') {
            return selectedQuestion.exactFragmentText;
        }
        return '';
    };

    const renderExercise = () => {
        if (!selectedQuestion) return null;

        switch (selectedQuestion.typeQuestion) {
            case 'multiple_choice':
                return (
                    <MultipleChoiceCard
                        question={selectedQuestion as MultipleChoiceQuestion}
                        selectedAnswer={typeof currentAnswer === 'string' ? currentAnswer : null}
                        onAnswerChange={setCurrentAnswer}
                        isChecking={isChecking}
                        isCorrect={isCorrect}
                    />
                );
            case 'ordering':
                return (
                    <OrderingCard
                        question={selectedQuestion as OrderingQuestion}
                        orderedFragments={
                            Array.isArray(currentAnswer) &&
                                currentAnswer.every((item) => typeof item === 'string')
                                ? (currentAnswer as string[])
                                : null
                        }
                        onOrderChange={setCurrentAnswer}
                        isChecking={isChecking}
                        isCorrect={isCorrect}
                    />
                );
            case 'matching':
                return (
                    <MatchingCard
                        question={selectedQuestion}
                        matches={
                            Array.isArray(currentAnswer) ? (currentAnswer as MatchingAnswer[]) : null
                        }
                        onMatchChange={setCurrentAnswer}
                        isChecking={isChecking}
                        isCorrect={isCorrect}
                    />
                );
            case 'gap':
                return (
                    <GapCard
                        question={selectedQuestion as GapQuestion}
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

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen ">
                <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen ">
                <p className="text-lg text-red-600 mb-2">Không thể tải danh sách câu sai</p>
                <p className="text-sm text-gray-500">Vui lòng thử lại sau.</p>
            </div>
        );
    }

    const hasQuestions = data.some((item) => item.questions.length > 0);

    if (!hasQuestions) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen ">
                <p className="text-xl text-gray-600 mb-2">Bạn chưa có câu sai nào 🎉</p>
                <p className="text-sm text-gray-500">Tiếp tục luyện tập để giữ phong độ nhé!</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen ">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    <h1 className="text-xl font-bold text-gray-900">Câu sai của bạn</h1>
                    <span className="text-sm text-gray-500">
                        Tổng:{" "}
                        {data.reduce((sum, item) => sum + item.questions.length, 0)} câu
                    </span>
                </div>
            </div>

            {/* Layout 2 cột */}
            <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Cột trái: list Unit + câu sai */}
                <div className="md:col-span-1 space-y-4">
                    {data.map((item) => {
                        const unit = item.unit[0]; // API trả mảng, lấy phần tử đầu
                        if (!unit || item.questions.length === 0) return null;

                        return (
                            <div
                                key={unit._id}
                                className="bg-white rounded-xl shadow-sm border overflow-hidden"
                            >
                                <div className="flex items-center gap-3 p-3 border-b bg-gray-50">
                                    {unit.thumbnail && (
                                        <img
                                            src={unit.thumbnail}
                                            alt={unit.title}
                                            className="w-10 h-10 rounded-md object-cover"
                                        />
                                    )}
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900 line-clamp-1">
                                            {unit.title}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {item.questions.length} câu sai
                                        </p>
                                    </div>
                                </div>

                                <div className="divide-y">
                                    {item.questions.map((q, index) => {
                                        const isActive = selectedQuestion?._id === q._id;

                                        const label =
                                            q.typeQuestion === 'multiple_choice'
                                                ? 'Trắc nghiệm'
                                                : q.typeQuestion === 'ordering'
                                                    ? 'Sắp xếp câu'
                                                    : q.typeQuestion === 'matching'
                                                        ? 'Nối từ'
                                                        : 'Điền vào chỗ trống';

                                        return (
                                            <button
                                                key={q._id}
                                                onClick={() => setSelectedQuestion(q)}
                                                className={`w-full text-left px-3 py-2 text-sm hover:bg-blue-50 flex items-start gap-2 ${isActive ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                                                    }`}
                                            >
                                                <span className="mt-0.5 text-xs text-gray-400">
                                                    {index + 1}.
                                                </span>
                                                <div>
                                                    <p className="text-xs font-medium text-blue-600">
                                                        {label}
                                                    </p>
                                                    {/* hiển thị gợi ý nội dung câu */}
                                                    {q.typeQuestion === 'multiple_choice' && (
                                                        <p className="text-xs text-gray-700 line-clamp-1">
                                                            Đáp án đúng: {q.correctAnswer}
                                                        </p>
                                                    )}
                                                    {q.typeQuestion === 'ordering' && (
                                                        <p className="text-xs text-gray-700 line-clamp-1">
                                                            {q.fragmentText.join(' / ')}
                                                        </p>
                                                    )}
                                                    {q.typeQuestion === 'matching' && (
                                                        <p className="text-xs text-gray-700 line-clamp-1">
                                                            {q.leftText.map((l) => l.value).join(', ')}
                                                        </p>
                                                    )}
                                                    {q.typeQuestion === 'gap' && (
                                                        <p className="text-xs text-gray-700 line-clamp-1">
                                                            Điền từ còn thiếu
                                                        </p>
                                                    )}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Cột phải: chi tiết câu hỏi + check đáp án */}
                <div className="md:col-span-2">
                    {!selectedQuestion ? (
                        <div className="h-full flex items-center justify-center">
                            <p className="text-gray-500 text-sm">
                                Chọn một câu sai ở bên trái để làm lại nhé.
                            </p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                            {renderExercise()}

                            {/* Thanh action */}
                            <div className="border-t pt-4 flex items-center justify-between">
                                <div className="text-sm text-gray-500">
                                    {isChecking && isCorrect === false && (
                                        <span>Đáp án đúng: {getCorrectAnswerDisplay()}</span>
                                    )}
                                    {isChecking && isCorrect === true && (
                                        <span className="text-green-600 font-medium">
                                            Chính xác rồi, tốt lắm!
                                        </span>
                                    )}
                                </div>

                                <div className="flex gap-2">
                                    {isChecking && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                setIsChecking(false);
                                                setIsCorrect(null);
                                                setCurrentAnswer(null);
                                            }}
                                        >
                                            Làm lại câu này
                                        </Button>
                                    )}
                                    <Button
                                        size="sm"
                                        onClick={handleCheck}
                                        disabled={!currentAnswer}
                                        className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300"
                                    >
                                        Kiểm tra
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserMistakesPage;
