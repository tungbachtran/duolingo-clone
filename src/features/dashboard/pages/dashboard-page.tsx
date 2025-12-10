import { useParams } from "react-router-dom";

import { getUnitAndLesson } from "../services";

import { LearningPath } from "../components/lesson-path/lesson-path";
import { Sidebar } from "../components/sidebar/sidebar";
import { Header } from "../components/header/header";

import { useQuery } from "@tanstack/react-query";

export const DashboardPage = () => {
  const params = useParams();

  const { data, isFetching } = useQuery({
    queryKey: ["unitsAndLessons", params.courseId],
    queryFn: () => getUnitAndLesson(params.courseId),
    refetchOnWindowFocus:false,
    refetchOnMount:false

  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar courseId={params.courseId} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Content Area */}
    
          {/* Lesson Path */}
          <div ><LearningPath units={data?.value.data.result} isFetching={isFetching} /></div>

          

      </div>
    </div>
  );
};
