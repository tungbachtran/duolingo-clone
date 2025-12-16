
import {   BookOpen, Trophy,  User,  Target, LogOut, Brain } from 'lucide-react';

export interface MenuItem {
  id: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  color?: string;
  path?: string; // Static path
  dynamicPath?: (courseId: string) => string; // Dynamic path
}

export const SIDEBAR_MENU_ITEMS: MenuItem[] = [
  { 
    id: 'exercise', 
    label: 'LUYỆN TẬP', 
    icon: Brain , 
    dynamicPath: (courseId: string) => `/dashboard/course/${courseId}`,
    color: 'text-blue-400' 
  },
 
  { 
    id: 'lesson', 
    label: 'LÍ THUYẾT', 
    icon: BookOpen, 
    dynamicPath: (courseId: string) => `/dashboard/course/${courseId}/units`,
    color: 'text-blue-400' 
  },
  { 
    id: 'leaderboard', 
    label: 'BẢNG XẾP HẠNG', 
    icon: Trophy, 
    path: '/dashboard/leaderboard', 
    color: 'text-yellow-500' 
  },
 
  { 
    id: 'mistake', 
    label: 'Lỗi sai', 
    icon: Target, 
    path: '/dashboard/user/mistakes', 
    color: 'text-gray-500' 
  },
 
  { 
    id: 'profile', 
    label: 'HỒ SƠ', 
    icon: User, 
    path: '/dashboard/user/profile', 
    color: 'text-gray-500' 
  },

  { 
    id: 'logout', 
    label: 'Đăng xuất', 
    icon: LogOut, 
    color: 'text-gray-500' 
  },
  
];
