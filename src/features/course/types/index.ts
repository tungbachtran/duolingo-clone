export interface Unit{
    _id:string,
    courseId:string,
    title:string,
    description:string,
    displayOrder:number,
    thumbnail:string,
    updatedAt:string,
    createdAt:string
}
export interface Course{
    _id:string,
    description:string,
    displayOrder:number,
    thumbnail:string,
    isActive:boolean,
    updatedAt:string,
    createdAt:string,
    isLocked:boolean
}

export interface CourseResponse{
    value:{
        data:{
            result: Course[]
        }
    }
}

export interface CourseCardProps{
    item:Course,
    onselect: (courseId:string) => void
}