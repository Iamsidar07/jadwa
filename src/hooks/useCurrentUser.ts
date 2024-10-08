"use client";
import { useQuery } from "react-query";
import { getCurrentUser } from "@/actions/getCurrentUser";

interface User {
  id: string;
  name: string;
  role: string;
  profileImageUrl: string;
}

const useCurrentUser = () => {
  const {
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => {
      return getCurrentUser();
    },
    staleTime: 0, // Data is always considered stale, so it will re-fetch
    cacheTime: 1000 * 60 * 5, // Cache user data for 5 minutes
    refetchOnWindowFocus: false, // Avoid re-fetching on window focus (optional)
  });
  return { user: user as User, error, isLoading };
};

export default useCurrentUser;
