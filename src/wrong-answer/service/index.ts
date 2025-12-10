import { apiConstant } from "@/features/authentication/constants"
import { axiosInstance } from "../../config/axios"
import type { Exercise } from "@/features/exercise/types/exercise.types"

import type { Unit } from "@/features/course/types";
export interface PostUserMistakeForm{
    wrongAnswer:string[]
}

export const postUserMistake = async(form:PostUserMistakeForm)=>{
    await axiosInstance.post(apiConstant.MISTAKE.POST_USER_MISTAKE,form,{
        withCredentials:true
    })
}
export interface UserMistakeItem {
    questions: Exercise[];
    unit: Unit[]; // API trả array, nhưng thực tế thường chỉ có 1 phần tử
  }
  export interface UserMistakeResponse {
    value: {
      data: UserMistakeItem[];
    };
  }

  export const getUserMistake = async (): Promise<UserMistakeItem[]> => {
    const res = await axiosInstance.get<UserMistakeResponse>(
      apiConstant.MISTAKE.POST_USER_MISTAKE,
      { withCredentials: true }
    );
    return res.data.value.data;
  };
