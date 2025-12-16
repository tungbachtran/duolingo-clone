import { CourseReducer, initialCourseId, type CourseAction, type CurrentCourseIdState } from "@/reducer/course.reducer";
import { createContext, useContext, useReducer } from "react";

interface CurrentCourseIdContextType{
    state: CurrentCourseIdState
    dispatch : React.Dispatch<CourseAction>
}

const CurrentCourseIdContext = createContext<CurrentCourseIdContextType|undefined>(undefined)

export const CurrentCourseIdProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(CourseReducer, initialCourseId);

  return (
    <CurrentCourseIdContext.Provider value={{ state, dispatch }}>
      {children}
    </CurrentCourseIdContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCurrentCourseId = () => {
  const ctx = useContext(CurrentCourseIdContext);
  if (!ctx)
    throw new Error("useProgress must be used inside <ProgressProvider>");
  return ctx;
};