// src/features/dashboard/components/LessonPath/TreasureChest.tsx
import { Gift } from 'lucide-react';

export const TreasureChest = () => {
  return (
    <div className="relative">
      <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl transform hover:scale-105 transition-all duration-200 cursor-pointer">
        <Gift className="w-10 h-10 text-white" />
      </div>
      {/* Decorative stars */}
      <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-300 rounded-full animate-ping"></div>
    </div>
  );
};
