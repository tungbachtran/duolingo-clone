export interface CurrentCourseIdState{
    courseId:string
}

export const initialCourseId:CurrentCourseIdState = {
    courseId:''
}
export enum CourseActionType {
    SET_COURSE_ID = "SET_COURSE_ID"
}

export type CourseAction = {
    type:CourseActionType.SET_COURSE_ID;payload:string
}

export const CourseReducer = (state:CurrentCourseIdState, action: CourseAction) =>{
    switch (action.type){
        case CourseActionType.SET_COURSE_ID:
            return {...initialCourseId, courseId:action.payload}
        default:
            return state
    }
}