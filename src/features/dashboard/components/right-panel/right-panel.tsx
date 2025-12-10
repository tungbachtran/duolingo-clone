// src/features/dashboard/components/RightPanel/RightPanel.tsx
import { SuperCard } from './super-card';
import { LeagueCard } from './league-card';
import { DailyQuestCard } from './daily-quest-card';

export const RightPanel = () => {
  return (
    <aside className="w-96 bg-gray-50 h-300 sticky top-0 overflow-y-auto p-6 space-y-6">
      <SuperCard />
      <LeagueCard />
      <DailyQuestCard />
    </aside>
  );
};
