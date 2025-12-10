// features/theory/pages/unit-theories.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUnitTheories } from '../services';
import type { Theory } from '../types/theory.types';
import { Button } from '@/components/ui/button';
import { Loader2, BookOpen, FileText, MessageSquare } from 'lucide-react';
import GrammarCard from '../components/grammar-card';
import FlashcardCard from '../components/flashcard-card';
import PhraseCard from '../components/phrase-card';

const UnitTheories = () => {
  const { unitId } = useParams<{ unitId: string }>();
  const navigate = useNavigate();
  
  const [theories, setTheories] = useState<Theory[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'grammar' | 'flashcard' | 'phrase'>('all');

  useEffect(() => {
    if (unitId) {
      loadTheories();
    }
  }, [unitId]);

  const loadTheories = async () => {
    try {
      setLoading(true);
      const data = await getUnitTheories(unitId!);
      setTheories(data.sort((a, b) => a.displayOrder - b.displayOrder));
    } catch (error) {
      console.error('Error loading theories:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTheories = filter === 'all' 
    ? theories 
    : theories.filter(t => t.typeTheory === filter);

  const getStats = () => {
    return {
      total: theories.length,
      grammar: theories.filter(t => t.typeTheory === 'grammar').length,
      flashcard: theories.filter(t => t.typeTheory === 'flashcard').length,
      phrase: theories.filter(t => t.typeTheory === 'phrase').length,
    };
  };

  const stats = getStats();

  const renderTheory = (theory: Theory) => {
    switch (theory.typeTheory) {
      case 'grammar':
        return <GrammarCard key={theory._id} theory={theory} />;
      case 'flashcard':
        return <FlashcardCard key={theory._id} theory={theory} />;
      case 'phrase':
        return <PhraseCard key={theory._id} theory={theory} />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
      </div>
    );
  }

  if (theories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <BookOpen className="w-24 h-24 text-gray-300 mb-4" />
        <p className="text-xl text-gray-600 mb-4">Chưa có lý thuyết nào</p>
        <Button onClick={() => navigate(-1)}>Quay lại</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            ← Quay lại
          </Button>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Lý thuyết Unit
          </h1>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-sm text-gray-600">Tổng số</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.grammar}</div>
              <div className="text-sm text-gray-600">Ngữ pháp</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">{stats.flashcard}</div>
              <div className="text-sm text-gray-600">Từ vựng</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.phrase}</div>
              <div className="text-sm text-gray-600">Cụm từ</div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
              className="whitespace-nowrap"
            >
              <FileText className="w-4 h-4 mr-2" />
              Tất cả ({stats.total})
            </Button>
            <Button
              variant={filter === 'grammar' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('grammar')}
              className="whitespace-nowrap"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Ngữ pháp ({stats.grammar})
            </Button>
            <Button
              variant={filter === 'flashcard' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('flashcard')}
              className="whitespace-nowrap"
            >
              <FileText className="w-4 h-4 mr-2" />
              Từ vựng ({stats.flashcard})
            </Button>
            <Button
              variant={filter === 'phrase' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('phrase')}
              className="whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Cụm từ ({stats.phrase})
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTheories.map(theory => renderTheory(theory))}
        </div>
      </div>
    </div>
  );
};

export default UnitTheories;
