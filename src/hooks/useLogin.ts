"use client";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const loginData = {
        email,
        password,
      };
      const { data } = await axios.post("/api/user/login", loginData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      router.push("/?loggedIn=true"); // Redirect after login
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return mutation.mutateAsync;
};
export default useLogin;
