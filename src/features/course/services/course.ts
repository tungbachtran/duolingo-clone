import type {  Course, CourseResponse } from "../types";

import { apiCourseConstant } from "../constant";
import { axiosInstance } from "../../../config/axios";

export const getCourses = async (): Promise<Course[]> => {
  try {
    const res = await axiosInstance.get<CourseResponse>(apiCourseConstant.GET_COURSE);
    return res.data.value.data.result;
  } catch (e) {
    console.error(e)
    return [];
  }
};
