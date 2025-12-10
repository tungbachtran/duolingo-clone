// src/features/dashboard/components/right-panel/league-card.tsx
import { Trophy, ChevronRight, TrendingUp } from 'lucide-react';

export const LeagueCard = () => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-gray-100 hover:border-orange-200 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-black text-gray-800">Giải đấu Đồng</h3>
        <button className="text-blue-600 text-sm font-bold hover:text-blue-700 flex items-center gap-1 group">
          XEM GIẢI ĐẤU
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-50 rounded-2xl p-5">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-orange-200/30 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative flex items-start gap-4">
          <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
            <Trophy className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-orange-600" />
              <span className="text-xs font-bold text-orange-600 uppercase tracking-wide">Tham gia ngay</span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              Hoàn thành một bài học để tham gia bảng xếp hạng tuần này và thi đua với những người học khác
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
