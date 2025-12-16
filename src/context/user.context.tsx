import { getUserProfile } from "@/features/dashboard/services";
import type { User } from "@/features/dashboard/type";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext } from "react";
interface UserContextType {
  user: User | null;
  isLoading: boolean;
  refetchUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();

  // Gọi API lấy user
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUserProfile,
    refetchOnMount:true,
    retry:1
  });

  const refetchUser = () => {
    queryClient.invalidateQueries({ queryKey: ["user"] });
  };

  return (
    <UserContext.Provider
      value={{ user: user ?? null, isLoading, refetchUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used inside <UserProvider>");
  return ctx;
};
