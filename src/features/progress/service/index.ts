import { axiosInstance } from "@/config/axios"
import { apiConstant } from "@/features/authentication/constants"
interface UserProgress{
    _id:string,
    user:string,
    lesson:string,
    unit:string,
    course:string,
    updatedAt:string,
    createdAt:string,
    _v:number
}
interface UserProgressResponse{
    value:UserProgress
}

export const getUserProgress = async():Promise<UserProgress> =>{
    const res = await axiosInstance.get<UserProgressResponse>(apiConstant.PROGRESS.UPDATE_USER_PROGRESS,{
        withCredentials:true
    })
    return res.data.value

}