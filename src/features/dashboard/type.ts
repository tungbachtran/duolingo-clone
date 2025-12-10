// src/features/dashboard/types.ts
export interface SidebarMenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  color?: string;
}

export interface LessonNodeData {
  id: string;
  type: "lesson" | "story" | "practice" | "treasure" | "achievement";
  status: "completed" | "current" | "locked";
  position: { x: number; y: number };
}

export interface DailyQuest {
  id: string;
  title: string;
  description: string;
  progress: number;
  total: number;
  icon: React.ReactNode;
  reward?: string;
}

export interface User {
  _id: string;
  email: string;
  avatarImage: string;
  fullName: string;
  streakCount: number;
  experiencePoint: number;
  heartCount: number;
}

export interface UserResponse {
  value: {
    data: User;
  };
}
