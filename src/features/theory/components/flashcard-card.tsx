// features/theory/components/flashcard-card.tsx
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Volume2, BookmarkIcon } from 'lucide-react';
import type { FlashcardTheory } from '../types/theory.types';

interface Props {
  theory: FlashcardTheory;
}

const FlashcardCard = ({ theory }: Props) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = () => {
    if (theory.audio) {
      const audio = new Audio(theory.audio);
      setIsPlaying(true);
      audio.play();
      audio.onended = () => setIsPlaying(false);
    }
  };

  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-all cursor-pointer h-100"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className="relative h-64">
        {!isFlipped ? (
          // Front side
          <div className="h-full flex flex-col">
            <div className="flex-1 relative">
              <img
                src={theory.image}
                alt={theory.term}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                  Từ vựng
                </span>
              </div>
            </div>
            <div className="p-4 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">
                    {theory.term}
                  </h3>
                  <p className="text-sm text-gray-500">{theory.ipa}</p>
                  <span className="inline-block mt-1 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                    {theory.partOfSpeech}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    playAudio();
                  }}
                  disabled={isPlaying}
                  className="w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 flex items-center justify-center transition-colors"
                >
                  <Volume2 className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Back side
          <div className="h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-6">
            <div className="text-center text-white">
              <BookmarkIcon className="w-12 h-12 mx-auto mb-4 opacity-80" />
              <p className="text-3xl font-bold mb-2">{theory.translation}</p>
              <p className="text-sm opacity-90">Nhấn để lật lại</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default FlashcardCard;
