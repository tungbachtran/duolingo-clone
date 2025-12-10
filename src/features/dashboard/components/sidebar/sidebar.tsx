// src/features/dashboard/components/sidebar/sidebar.tsx
import { SidebarItem } from './sidebar-item';
import { SIDEBAR_MENU_ITEMS } from '../../constants';
import { Crown } from 'lucide-react';

interface SidebarProps {
  courseId?: string;
}

export const Sidebar = ({ courseId }: SidebarProps) => {
  return (
    <aside className="w-72 bg-white border-r-2 border-gray-100 h-screen sticky top-0 overflow-y-auto">
      {/* Logo */}
      <div className="p-6 border-b-2 border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-green-400 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white font-black text-2xl">D</span>
          </div>
          <h1 className="text-3xl font-black text-green-400">duolingo</h1>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="p-4 space-y-2">
        {SIDEBAR_MENU_ITEMS.map((item) => (
          <SidebarItem
            key={item.id}
            id={item.id}
            label={item.label}
            icon={item.icon}
            path={item.path}
            dynamicPath={item.dynamicPath}
            color={item.color}
            courseId={courseId}
          />
        ))}
      </nav>

      {/* Premium CTA */}
     
    </aside>
  );
};
