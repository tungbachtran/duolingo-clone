
import { getUserProgress } from "@/features/progress/service";

import { useQuery } from "@tanstack/react-query";

import { createContext, useContext } from "react";


interface ProgressContextType {
    courseId?: string
    isFetching:boolean
 
}

const UserProgressContext = createContext<ProgressContextType | undefined>(
    undefined
);

export const UserProgressProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
  
    const {data:res,isFetching} = useQuery({ queryKey: ["courseId"], queryFn: getUserProgress, refetchOnMount: true,retry:1 })
   
    const courseId = res?.course
    return (
        <UserProgressContext.Provider value={{ courseId,isFetching}}>
            {children}
        </UserProgressContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUserProgress = () => {
    const ctx = useContext(UserProgressContext);
    if (!ctx)
        throw new Error("useUserProgress must be used inside <ProgressProvider>");
    return ctx;
};
