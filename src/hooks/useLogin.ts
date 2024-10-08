"use client";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
      toast.success("Login Successfully...");
      router.push("/?loggedIn=true"); // Redirect after login
    },
    onError: (error) => {
      console.log(error);
      toast.error("Something went wrong");
    },
  });

  return mutation.mutateAsync;
};
export default useLogin;
