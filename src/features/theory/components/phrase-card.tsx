
import { Card } from '@/components/ui/card';
import {  MessageSquare } from 'lucide-react';
import type { PhraseTheory } from '../types/theory.types';

interface Props {
  theory: PhraseTheory;
}

const PhraseCard = ({ theory }: Props) => {


  

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
        
        </div>
      </div>
    </Card>
  );
};

export default PhraseCard;
