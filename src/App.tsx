// src/App.tsx hoặc router configuration file
import { BrowserRouter } from "react-router-dom";
import { IndexRoutes } from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "./context/user.context";
import { ProgressProvider } from "./context/progress.context";
import { CourseProvider } from "./features/course/context/course.context";
import { UserProgressProvider } from "./context/user-progress.context";
import { CurrentCourseIdProvider } from "./context/current-course-id.context";
import { Toaster } from "sonner";
function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" richColors />
      <CourseProvider>
      <UserProvider>
        <ProgressProvider>
        <UserProgressProvider>
        <CurrentCourseIdProvider>
          <BrowserRouter>
            <IndexRoutes />
          </BrowserRouter>
          </CurrentCourseIdProvider>
          </UserProgressProvider>
        </ProgressProvider>
      </UserProvider>
      </CourseProvider>
    </QueryClientProvider>
  );
}

export default App;
