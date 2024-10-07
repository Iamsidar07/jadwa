"use client";
import { useQuery } from "react-query";
import { getCurrentUser } from "@/actions/getCurrentUser";

interface User {
  id: string;
  name: string;
  role: string;
}

const useCurrentUser = () => {
  const {
    data: user,
    error,
    isLoading,
  } = useQuery<User>({
    queryKey: ["currentUser"],
    queryFn: () => {
      console.log("getCurrentUser");
      return getCurrentUser();
    },
    staleTime: 0, // Data is always considered stale, so it will re-fetch
    cacheTime: 1000 * 60 * 5, // Cache user data for 5 minutes
    refetchOnWindowFocus: false, // Avoid re-fetching on window focus (optional)
  });

  console.log({ user, error, isLoading });

  return { user, error, isLoading };
};

export default useCurrentUser;
