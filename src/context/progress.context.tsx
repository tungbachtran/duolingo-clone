import type { UpdateUserProgressForm } from "@/features/dashboard/services";
import {
  initialProgressState,
  progressReducer,
  type ProgressAction,
} from "@/reducer/progress.reducer";
import { createContext, useContext, useReducer } from "react";

interface ProgressContextType {
  state: UpdateUserProgressForm;
  dispatch: React.Dispatch<ProgressAction>;
}

const ProgressContext = createContext<ProgressContextType | undefined>(
  undefined
);

export const ProgressProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(progressReducer, initialProgressState);

  return (
    <ProgressContext.Provider value={{ state, dispatch }}>
      {children}
    </ProgressContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProgress = () => {
  const ctx = useContext(ProgressContext);
  if (!ctx)
    throw new Error("useProgress must be used inside <ProgressProvider>");
  return ctx;
};
