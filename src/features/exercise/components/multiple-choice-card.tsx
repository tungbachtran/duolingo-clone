// components/exercises/MultipleChoiceCard.tsx
import { useState, useEffect } from 'react';
import type { MultipleChoiceQuestion } from '../types/exercise.types'; 
import { Card } from '@/components/ui/card';
import { Volume2 } from 'lucide-react';

interface Props {
  question: MultipleChoiceQuestion;
  selectedAnswer: string | null;
  onAnswerChange: (answer: string) => void;
  isChecking: boolean;
  isCorrect: boolean | null;
}

const MultipleChoiceCard = ({ question, selectedAnswer, onAnswerChange, isChecking, isCorrect }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const isImage = question.mediaUrl? (question.mediaUrl.includes('http') && 
    (question.mediaUrl.includes('.jpg') || question.mediaUrl.includes('.png') || question.mediaUrl.includes('.jpeg'))) : false;
  
  const isAudio = question.mediaUrl? (question.mediaUrl.includes('.mp3')) : false;

  const playAudio = () => {
    if (isAudio) {
      const audio = new Audio(question.mediaUrl);
      setIsPlaying(true);
      audio.play();
      audio.onended = () => setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (isAudio) {
      playAudio();
    }
  }, []);

  const getButtonStyle = (answer: string) => {
    if (!isChecking) {
      return selectedAnswer === answer
        ? 'border-blue-500 bg-blue-50 border-2'
        : 'border-gray-300 hover:bg-gray-50';
    }

    if (selectedAnswer === answer) {
      return isCorrect
        ? 'border-green-500 bg-green-50 border-2'
        : 'border-red-500 bg-red-50 border-2';
    }

    if (answer === question.correctAnswer && !isCorrect) {
      return 'border-green-500 bg-green-50 border-2';
    }

    return 'border-gray-300 opacity-50';
  };

  return (
    <Card className="p-8 shadow-lg">
      <div className="space-y-6">
        {/* Question Header */}
        <div className="text-center">
          {question.title && <h1 className="text-3xl font-extrabold text-gray-900 mb-4">{question.title}</h1>}
          {question.mediaUrl && (
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {isImage ? 'Đây là gì?' : isAudio ? 'Bạn nghe thấy gì?' : `"${question.mediaUrl}" nghĩa là gì?`}
          </h2>
          )}
        </div>

        {/* Media Display */}
        {question.mediaUrl && (
          <div className="flex justify-center mb-8">
          {isImage && (
            <img
              src={question.mediaUrl}
              alt="Question"
              className="max-w-md w-full h-64 object-contain rounded-lg shadow-md"
            />
          )}
          {isAudio && (
            <button
              onClick={playAudio}
              disabled={isPlaying}
              className="w-24 h-24 rounded-full bg-green-500 hover:bg-green-600 disabled:bg-green-300 flex items-center justify-center shadow-lg transition-transform hover:scale-105"
            >
              <Volume2 className="w-12 h-12 text-white" />
            </button>
          )}
          {!isImage && !isAudio && (
            <div className="text-4xl font-bold text-green-600 bg-green-50 px-12 py-8 rounded-lg">
              {question.mediaUrl}
            </div>
          )}
        </div>
        )}

        {/* Answer Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => !isChecking && onAnswerChange(answer)}
              disabled={isChecking}
              className={`p-6 rounded-xl border-2 text-left font-medium text-lg transition-all ${getButtonStyle(answer)}`}
            >
              {answer}
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default MultipleChoiceCard;
