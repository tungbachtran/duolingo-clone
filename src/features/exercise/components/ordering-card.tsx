// components/exercises/OrderingCard.tsx
import { useState, useEffect } from 'react';
import type { OrderingQuestion } from '../types/exercise.types'; 
import { Card } from '@/components/ui/card';


interface Props {
  question: OrderingQuestion;
  orderedFragments: string[] | null;
  onOrderChange: (fragments: string[]) => void;
  isChecking: boolean;
  isCorrect: boolean | null;
}

const OrderingCard = ({ question, onOrderChange, isChecking, isCorrect }: Props) => {
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);

  useEffect(() => {
    const shuffled = [...question.fragmentText].sort(() => Math.random() - 0.5);
    setAvailableWords(shuffled);
    setSelectedWords([]);
  }, [question]);

  useEffect(() => {
    if (selectedWords.length > 0) {
      onOrderChange(selectedWords);
    }
  }, [selectedWords]);

  const handleWordClick = (word: string, fromAvailable: boolean) => {
    if (isChecking) return;

    if (fromAvailable) {
      setAvailableWords(availableWords.filter(w => w !== word));
      setSelectedWords([...selectedWords, word]);
    } else {
      setSelectedWords(selectedWords.filter(w => w !== word));
      setAvailableWords([...availableWords, word]);
    }
  };

  const getCardStyle = () => {
    if (!isChecking) return 'border-gray-200';
    return isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50';
  };

  return (
    <Card className={`p-8 shadow-lg border-2 ${getCardStyle()}`}>
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Sắp xếp câu sau</h2>
          <p className="text-gray-600">Nhấn vào các từ để tạo thành câu hoàn chỉnh</p>
        </div>

        {/* Selected Words Area */}
        <div className="min-h-[120px] p-6 bg-white border-2 border-dashed border-gray-300 rounded-xl">
          {selectedWords.length === 0 ? (
            <p className="text-center text-gray-400 py-8">Chọn các từ bên dưới</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {selectedWords.map((word, index) => (
                <button
                  key={index}
                  onClick={() => handleWordClick(word, false)}
                  disabled={isChecking}
                  className="px-4 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50"
                >
                  {word}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Available Words */}
        <div className="flex flex-wrap gap-3 justify-center">
          {availableWords.map((word, index) => (
            <button
              key={index}
              onClick={() => handleWordClick(word, true)}
              disabled={isChecking}
              className="px-6 py-3 bg-gray-100 border-2 border-gray-300 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              {word}
            </button>
          ))}
        </div>

        {isChecking && !isCorrect && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Đáp án đúng:</strong> {question.exactFragmentText}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default OrderingCard;
