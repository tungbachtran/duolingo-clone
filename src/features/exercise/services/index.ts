// services/index.ts
import { apiConstant } from "@/features/authentication/constants";
import { axiosInstance } from '../../../config/axios';
import type { Exercise } from '../types/exercise.types';

interface ExerciseResponse {
  value: {
    data: Exercise[];
  };
}

export const getLessonExercises = async (lessonId: string): Promise<Exercise[]> => {
  const res = await axiosInstance.get<ExerciseResponse>(
    apiConstant.EXERCISE.GET_LESSON_EXERCISES(lessonId),{
      withCredentials:true
    }
  );
  return res.data.value.data;
};
