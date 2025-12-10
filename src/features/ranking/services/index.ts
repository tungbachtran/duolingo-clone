import { axiosInstance } from "@/config/axios";
import { apiConstant } from "@/features/authentication/constants";

// types/leaderboard.types.ts
export interface LeaderboardItem {
    _id: string;
    fullName: string;
    avatarImage?: string;
    experiencePoint: number;
    rank: number;
  }
  
  export interface LeaderboardResponse {
    value: {
      data: LeaderboardItem[];
    };
  }

  export const getLeaderboard = async (): Promise<LeaderboardItem[]> => {
    const res = await axiosInstance.get<LeaderboardResponse>(
      apiConstant.LEADERBOARD.GET_LEADERBOARD,
      { withCredentials: true }
    );
    return res.data.value.data;
  };