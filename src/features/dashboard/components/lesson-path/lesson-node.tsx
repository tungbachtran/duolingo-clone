// src/features/dashboard/components/LessonPath/LessonNode.tsx
import { Check, Book, Lock } from 'lucide-react';

interface LessonNodeProps {
  type: 'lesson' | 'story' | 'practice' | 'achievement';
  status: 'completed' | 'current' | 'locked';
  onClick?: () => void;
}

export const LessonNode = ({ status, onClick }: LessonNodeProps) => {
  const getIcon = () => {
    if (status === 'completed') return <Check className="w-6 h-6 text-white" />;
    if (status === 'locked') return <Lock className="w-5 h-5 text-gray-400" />;
    return <Book className="w-6 h-6 text-white" />;
  };

  const getStyles = () => {
    if (status === 'completed') {
      return 'bg-gradient-to-br from-green-400 to-green-500 shadow-lg';
    }
    if (status === 'current') {
      return 'bg-gradient-to-br from-blue-400 to-blue-500 shadow-xl animate-pulse';
    }
    return 'bg-gray-300 cursor-not-allowed';
  };

  return (
    <button
      onClick={status !== 'locked' ? onClick : undefined}
      disabled={status === 'locked'}
      className={`
        w-16 h-16 rounded-full flex items-center justify-center
        transition-all duration-200 hover:scale-110
        ${getStyles()}
        ${status !== 'locked' ? 'cursor-pointer' : ''}
      `}
    >
      {getIcon()}
    </button>
  );
};
