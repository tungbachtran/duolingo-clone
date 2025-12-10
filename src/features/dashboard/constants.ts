// src/features/dashboard/constants.ts
import {   BookOpen, Trophy,  User,  Target } from 'lucide-react';

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
    id: 'lesson', 
    label: 'LUYỆN TẬP', 
    icon: BookOpen, 
    dynamicPath: (courseId: string) => `/course/${courseId}/units`,
    color: 'text-blue-400' 
  },
  { 
    id: 'leaderboard', 
    label: 'BẢNG XẾP HẠNG', 
    icon: Trophy, 
    path: '/leaderboard', 
    color: 'text-yellow-500' 
  },
 
  { 
    id: 'mistake', 
    label: 'Lỗi sai', 
    icon: Target, 
    path: '/user/mistakes', 
    color: 'text-gray-500' 
  },
 
  { 
    id: 'profile', 
    label: 'HỒ SƠ', 
    icon: User, 
    path: '/profile', 
    color: 'text-gray-500' 
  },

  { 
    id: 'logout', 
    label: 'Đăng xuất', 
    icon: User, 
    color: 'text-gray-500' 
  },
  
];
