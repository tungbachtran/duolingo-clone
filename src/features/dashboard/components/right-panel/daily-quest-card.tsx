// src/features/dashboard/components/right-panel/daily-quest-card.tsx
import { Target, Zap, ChevronRight, Gift } from 'lucide-react';

interface Quest {
  id: string;
  title: string;
  progress: number;
  total: number;
  icon: React.ReactNode;
  color: string;
}

export const DailyQuestCard = () => {
  const quests: Quest[] = [
    {
      id: '1',
      title: 'Kiếm 10 KN',
      progress: 0,
      total: 10,
      icon: <Zap className="w-6 h-6" />,
      color: 'yellow',
    },
    {
      id: '2',
      title: 'Hoàn thành 1 bài học hoàn hảo',
      progress: 0,
      total: 1,
      icon: <Target className="w-6 h-6" />,
      color: 'green',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      yellow: {
        bg: 'bg-yellow-100',
        icon: 'text-yellow-600',
        progress: 'from-yellow-400 to-orange-400',
      },
      green: {
        bg: 'bg-green-100',
        icon: 'text-green-600',
        progress: 'from-green-400 to-emerald-400',
      },
    };
    return colors[color as keyof typeof colors] || colors.yellow;
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-gray-100">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-black text-gray-800">Nhiệm vụ hằng ngày</h3>
        <button className="text-blue-600 text-sm font-bold hover:text-blue-700 flex items-center gap-1 group">
          XEM TẤT CẢ
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="space-y-4">
        {quests.map((quest) => {
          const colors = getColorClasses(quest.color);
          return (
            <div key={quest.id} className="group hover:bg-gray-50 rounded-2xl p-3 -mx-3 transition-colors">
              <div className="flex items-start gap-3">
                <div className={`flex-shrink-0 w-14 h-14 ${colors.bg} rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform`}>
                  <div className={colors.icon}>
                    {quest.icon}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-800 mb-3">
                    {quest.title}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${colors.progress} transition-all duration-500 rounded-full`}
                        style={{ width: `${(quest.progress / quest.total) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-black text-gray-500 tabular-nums">
                      {quest.progress}/{quest.total}
                    </span>
                  </div>
                </div>
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all">
                  <Gift className="w-5 h-5 text-orange-600" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
