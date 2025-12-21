// components/exercises/GapCard.tsx
import { useState, useEffect } from 'react';
import type { GapQuestion } from '../types/exercise.types'; 
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Volume2 } from 'lucide-react';

interface Props {
  question: GapQuestion;
  answer: string | null;
  onAnswerChange: (answer: string) => void;
  isChecking: boolean;
  isCorrect: boolean | null;
}

const GapCard = ({ question, answer, onAnswerChange, isChecking, isCorrect }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = () => {
    const audio = new Audio(question.mediaUrl);
    setIsPlaying(true);
    audio.play();
    audio.onended = () => setIsPlaying(false);
  };

  useEffect(() => {
    playAudio();
  }, []);

  const getInputStyle = () => {
    if (!isChecking) return 'border-gray-300 focus:border-blue-500';
    return isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50';
  };

  return (
    <Card className="p-8 shadow-lg">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Nghe và viết lại</h2>
          <p className="text-gray-600">Nghe đoạn audio và viết lại những gì bạn nghe được</p>
        </div>

        {/* Audio Player */}
        <div className="flex justify-center">
          <button
            onClick={playAudio}
            disabled={isPlaying}
            className="w-24 h-24 rounded-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 flex items-center justify-center shadow-lg transition-transform hover:scale-105"
          >
            <Volume2 className="w-12 h-12 text-white" />
          </button>
        </div>

        {/* Input Field */}
        <div className="max-w-2xl mx-auto">
          <Input
            type="text"
            value={answer || ''}
            onChange={(e) => onAnswerChange(e.target.value)}
            disabled={isChecking}
            placeholder="Nhập câu trả lời của bạn..."
            className={`text-lg p-6 border-2 ${getInputStyle()}`}
          />
        </div>

        {isChecking && !isCorrect && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg max-w-2xl mx-auto">
            <p className="text-sm text-white-800">
              <strong>Đáp án đúng:</strong> {question.correctAnswer}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default GapCard;
