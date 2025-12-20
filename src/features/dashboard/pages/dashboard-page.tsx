import { Outlet} from "react-router-dom";


import { Sidebar } from "../components/sidebar/sidebar";
import { Header } from "../components/header/header";
import { useCurrentCourseId } from "@/context/current-course-id.context";

import { useUserProgress } from "@/context/user-progress.context";

export const DashboardPage = () => {
  const {state} = useCurrentCourseId();
  const {courseId} = useUserProgress()



  return (
    <div className="flex min-h-screen bg-gray-50">

      <Sidebar courseId={state.courseId.length > 0 ? state.courseId : courseId} />


      <div className="flex-1 flex flex-col">

        <Header />


        <div ><Outlet /></div>



      </div>
    </div>
  );
};
