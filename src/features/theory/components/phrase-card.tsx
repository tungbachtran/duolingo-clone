// features/theory/components/phrase-card.tsx
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Volume2, MessageSquare } from 'lucide-react';
import type { PhraseTheory } from '../types/theory.types';

interface Props {
  theory: PhraseTheory;
}

const PhraseCard = ({ theory }: Props) => {
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
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
          <MessageSquare className="w-6 h-6 text-orange-600" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">
              Cụm từ
            </span>
          </div>
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-lg mb-4">
            <p className="text-xl font-bold text-gray-800 mb-2">
              {theory.phraseText}
            </p>
            <p className="text-gray-600">
              {theory.translation}
            </p>
          </div>
          <button
            onClick={playAudio}
            disabled={isPlaying}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white rounded-lg transition-colors"
          >
            <Volume2 className="w-5 h-5" />
            <span className="font-medium">
              {isPlaying ? 'Đang phát...' : 'Nghe phát âm'}
            </span>
          </button>
        </div>
      </div>
    </Card>
  );
};

export default PhraseCard;
