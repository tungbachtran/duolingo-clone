// src/features/course/components/course-card/CourseCard.tsx
import { Button } from "@/components/ui/button";
import type { CourseCardProps } from "../../types";
import {  CardContent } from "@/components/ui/card";
import { LockKeyhole } from "lucide-react";


export const CourseCard = ({ item, onselect }: CourseCardProps) => {
  return (
    <Button
      className="group cursor-pointer border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 overflow-hidden bg-white h-70 flex flex-col hover:bg-gray-100"
      disabled = {item.isLocked} 
      onClick={() => onselect(item._id)}
    >
      <div className="relative h-full overflow-hidden ">
        <img 
          src={item.thumbnail} 
          alt={item.description}
          className="w-auto h-30 object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        
      </div>
      
      <CardContent className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {item.description}
        </h3>
        {item.isLocked && (<div className=" text-black flex justify-center items-center"><LockKeyhole className="size-[50px]" /></div>)}
        
      </CardContent>
    </Button>
  );
};
