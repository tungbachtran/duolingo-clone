// src/features/dashboard/components/right-panel/super-card.tsx
import { Sparkles } from 'lucide-react';

export const SuperCard = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-6 text-white shadow-2xl">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-xl flex items-center gap-1">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-black tracking-wider">SUPER</span>
          </div>
          <div className="text-6xl transform hover:scale-110 transition-transform cursor-pointer">
            🦉
          </div>
        </div>
        
        <h3 className="text-2xl font-black mb-2">Thử Super miễn phí</h3>
        <p className="text-sm text-white/90 mb-6 leading-relaxed">
          Không quảng cáo, học phù hợp với trình độ và không giới hạn số lần chinh phục Huyền thoại!
        </p>
        
       
      </div>
    </div>
  );
};
