import { axiosInstance } from "@/config/axios";
import { apiConstant } from "@/features/authentication/constants";

// types/auth.types.ts
export interface Role {
    _id: string;
    name: string;
    permissions: string[];
  }
  
  export interface Profile {
    _id: string;
    email: string;
    fullName: string;
    isActive: boolean;
    streakCount: number;
    lastActiveAt: string;
    avatarImage:string;
    experiencePoint: number;
    heartCount: number;
    roleId: Role;
    updatedAt: string;
    createdAt: string;
  }
  interface ProfileResponse {
    value: {
      data: Profile;
    };
  }

  export interface UpdateProfileForm{
    password?:string,
    fullName?:string,
    avatarImage?:string

  }
  
  export const getProfile = async () => {
    const res = await axiosInstance.get<ProfileResponse>(apiConstant.PROFILE, {
      withCredentials: true,
    });
    return res.data.value.data;
  };  
  export const updateProfile = async (payload: UpdateProfileForm) => {
    const { data } = await axiosInstance.patch('/api/users/profile', payload);
    return data;
  };

