// components/exercises/MatchingCard.tsx
import { useState, useEffect } from 'react';

import { Card } from '@/components/ui/card';
import type { MatchingPair, MatchingQuestion } from '../types/exercise.types';

interface Props {
  question: MatchingQuestion;
  matches: any;
  onMatchChange: (matches: any) => void;
  isChecking: boolean;
  isCorrect: boolean | null;
}

const MatchingCard = ({ question,  onMatchChange, isChecking, isCorrect }: Props) => {
  const [leftItems, setLeftItems] = useState<MatchingPair[]>([]);
  const [rightItems, setRightItems] = useState<MatchingPair[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<{ leftId: string; rightId: string }[]>([]);

  useEffect(() => {
    setLeftItems(question.leftText);
    const shuffledRight = [...question.rightText].sort(() => Math.random() - 0.5);
    setRightItems(shuffledRight);
    setMatchedPairs([]);
    setSelectedLeft(null);
    setSelectedRight(null);
  }, [question]);

  useEffect(() => {
    if (matchedPairs.length > 0) {
      onMatchChange(matchedPairs);
    }
  }, [matchedPairs]);

  const handleLeftClick = (pairId: string) => {
    if (isChecking) return;
    if (matchedPairs.some(p => p.leftId === pairId)) return;
    
    setSelectedLeft(pairId);
    if (selectedRight) {
      setMatchedPairs([...matchedPairs, { leftId: pairId, rightId: selectedRight }]);
      setSelectedLeft(null);
      setSelectedRight(null);
    }
  };

  const handleRightClick = (pairId: string) => {
    if (isChecking) return;
    if (matchedPairs.some(p => p.rightId === pairId)) return;
    
    setSelectedRight(pairId);
    if (selectedLeft) {
      setMatchedPairs([...matchedPairs, { leftId: selectedLeft, rightId: pairId }]);
      setSelectedLeft(null);
      setSelectedRight(null);
    }
  };

  const handlePairClick = (leftId: string, rightId: string) => {
    if (isChecking) return;
    setMatchedPairs(matchedPairs.filter(p => !(p.leftId === leftId && p.rightId === rightId)));
  };

  const isMatched = (pairId: string, side: 'left' | 'right') => {
    return matchedPairs.some(p => side === 'left' ? p.leftId === pairId : p.rightId === pairId);
  };

  const getMatchedRight = (leftId: string) => {
    const pair = matchedPairs.find(p => p.leftId === leftId);
    return pair ? rightItems.find(r => r.pairId === pair.rightId) : null;
  };

  const getCardStyle = () => {
    if (!isChecking) return 'border-gray-200';
    return isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50';
  };

  return (
    <Card className={`p-8 shadow-lg border-2 ${getCardStyle()}`}>
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Ghép các cặp từ</h2>
          <p className="text-gray-600">Chọn một từ bên trái và một từ bên phải để ghép cặp</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-3">
            {leftItems.map((item) => {
              const matched = getMatchedRight(item.pairId);
              const isSelected = selectedLeft === item.pairId;
              
              return (
                <div key={item.pairId} className="space-y-2">
                  <button
                    onClick={() => !matched && handleLeftClick(item.pairId)}
                    disabled={isChecking || !!matched}
                    className={`w-full p-4 rounded-lg border-2 font-medium text-left transition-all ${
                      matched
                        ? 'bg-green-100 border-green-500 cursor-default'
                        : isSelected
                        ? 'bg-green-500 text-white border-green-500'
                        : 'bg-white border-gray-300 hover:border-green-300'
                    }`}
                  >
                    {item.value}
                  </button>
                  
                  {matched && (
                    <button
                      onClick={() => handlePairClick(item.pairId, matched.pairId)}
                      disabled={isChecking}
                      className="w-full p-4 rounded-lg border-2 border-green-500 bg-blue-100 font-medium text-left"
                    >
                      ↔ {matched.value}
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column */}
          <div className="space-y-3">
            {rightItems.map((item) => {
              const matched = isMatched(item.pairId, 'right');
              const isSelected = selectedRight === item.pairId;
              
              if (matched) return null;
              
              return (
                <button
                  key={item.pairId}
                  onClick={() => handleRightClick(item.pairId)}
                  disabled={isChecking}
                  className={`w-full p-4 rounded-lg border-2 font-medium text-left transition-all ${
                    isSelected
                      ? 'bg-green-500 text-white border-green-500'
                      : 'bg-white border-gray-300 hover:border-green-300'
                  }`}
                >
                  {item.value}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MatchingCard;
