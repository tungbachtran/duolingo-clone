import { apiConstant } from "@/features/authentication/constants";
import { axiosInstance } from "../../../config/axios";
import type { User, UserResponse } from "../type";

export interface Pagination {
  page: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
}

// Bài học (Lesson)
export interface Lesson {
  _id: string;
  unitId: string;
  title: string;
  objectives: string;
  displayOrder: number;
  thumbnail: string;
  updatedAt: string; // ISO date string
  createdAt: string; // ISO date string
  __v: number;
  experiencePoint: number;
  isLocked: boolean;
}

export interface UpdateUserProgressForm {
  lessonId: string;
  unitId: string;
  courseId?:string
  experiencePoint: number;
  heartCount?: number;
}

// Đơn vị (Unit)
export interface Unit {
  _id: string;
  courseId: string;
  title: string;
  description: string;
  displayOrder: number;
  thumbnail: string;
  updatedAt: string;
  createdAt: string;
  __v: number;
  lessons: Lesson[]; // Mảng bài học trong mỗi unit
}

interface UserProgress{
  _id:string;
  user:string;
  lesson:string;
  unit:string;
  course:string;
  updatedAt:string,
  createdAt:string,
}
interface UserProgressResponse{
  value:UserProgress
}

// Gói dữ liệu trả về
export interface UnitResponse {
  value: {
    data: {
      result: Unit[];
    };
  };
}

export interface UnitNotLockedResponse {
  value: {
    data: {
      items: Unit[];
    };
  };
}
export const getUnitAndLesson = async (
  courseId?: string
): Promise<UnitResponse> => {
  if (courseId) {
    const res = await axiosInstance.get<UnitResponse>(
      apiConstant.COURSE.GET_UNIT_AND_LESSON(courseId),
      {
        withCredentials: true,
      }
    );
    return res.data;
  }
  return {
    value: {
      data: {
        result: [],
      },
    },
  };
};

export const getUnitAndLessonNotLocked = async (
  courseId?: string
): Promise<UnitNotLockedResponse> => {
  if (courseId) {
    const res = await axiosInstance.get<UnitNotLockedResponse>(
      apiConstant.COURSE.GET_UNIT_AND_LESSON_NOT_LOCKED(courseId),
      {
        withCredentials: true,
      }
    );
    return res.data;
  }
  return {
    value: {
      data: {
        items: [],
      },
    },
  };
};

export const getUserProfile = async (): Promise<User> => {
  const res = await axiosInstance.get<UserResponse>(
    apiConstant.USER.GET_USER_INFO,
    { withCredentials: true }
  );
  return res.data.value.data;
};

export const getUserProgress = async (): Promise<UserProgress> => {
  const res = await axiosInstance.get<UserProgressResponse>(apiConstant.PROGRESS.UPDATE_USER_PROGRESS, { withCredentials: true });
  return res.data.value;
};

export const updateUserProgress = async (form: UpdateUserProgressForm) => {
  await axiosInstance.patch(apiConstant.PROGRESS.UPDATE_USER_PROGRESS, form);
};
