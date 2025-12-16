
import {  useState } from "react";
import { getCourses } from "../services/course";

import { Input } from "@/components/ui/input";
import { Search, GraduationCap } from "lucide-react";
import { CourseCard } from "../components/course-card";
import { useNavigate } from "react-router-dom";

import { useQuery } from '@tanstack/react-query';
import { Spinner } from "@/components/ui/spinner";
import { useCurrentCourseId } from "@/context/current-course-id.context";
import { CourseActionType } from "@/reducer/course.reducer";

export const CoursePage = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const {data,isFetching} = useQuery({queryKey:['courses'],queryFn:getCourses})
  const {dispatch} = useCurrentCourseId()
  const handleSelectCourse = (courseId: string) => {
    dispatch({type:CourseActionType.SET_COURSE_ID, payload:courseId})
    navigate(`/dashboard/course/${courseId}`);
  };

  const filteredCourses = data?.filter(course =>
    course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if(isFetching){
    return(
      <>
      <div className="flex items-center justify-center gap-4 m-auto">
        <h1>Đang tải</h1>
        <Spinner/>
      </div>
      </>
    )
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-400 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Chọn khóa học
                </h1>
                <p className="text-sm text-gray-500">
                  Tìm khóa học phù hợp với bạn
                </p>
              </div>
            </div>

            {/* Search */}
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Tìm kiếm khóa học..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border-2 border-gray-200 focus:border-blue-400 rounded-lg"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <span className="font-bold text-xl">
              {filteredCourses ? filteredCourses.length : 0} khóa học
            </span>
    
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {filteredCourses && filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard 
                key={course._id} 
                item={course} 
                onselect={handleSelectCourse} 
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Không tìm thấy khóa học
            </h3>
            <p className="text-sm text-gray-500">
              Thử tìm kiếm với từ khóa khác
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
