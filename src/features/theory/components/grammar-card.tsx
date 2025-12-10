// features/theory/components/grammar-card.tsx
import { Card } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';
import type { GrammarTheory } from '../types/theory.types';

interface Props {
  theory: GrammarTheory;
}

const GrammarCard = ({ theory }: Props) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
          <BookOpen className="w-6 h-6 text-purple-600" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
              Ngữ pháp
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            {theory.title}
          </h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            {theory.content}
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-sm text-gray-500 mb-1 font-semibold">Ví dụ:</p>
            <p className="text-gray-800 italic">{theory.example}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GrammarCard;
