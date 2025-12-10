import { createContext, useContext, useState } from "react";
interface CourseContextValue {
  courseId: string;
  updateCourseId: (newValue: string) => void;
}

const CourseContext = createContext<CourseContextValue | undefined>(undefined);
export const CourseProvider = ({ children }: { children: React.ReactNode }) => {
  const [courseId, setCourseId] = useState("");

  const updateCourseId = (newValue: string) => {
    setCourseId(newValue);
  };

  return (
    <CourseContext.Provider value={{ courseId, updateCourseId }}>
      {children}
    </CourseContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCourseId = () => {
  const ctx = useContext(CourseContext);
  if (!ctx)
    throw new Error("useProgress must be used inside <CourseProvider>");
  return ctx;
};
