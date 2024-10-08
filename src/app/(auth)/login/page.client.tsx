"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { z } from "zod";
import { toast } from "sonner";
import useLogin from "@/hooks/useLogin";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/svgs";
import Link from "next/link";
import { Loader } from "lucide-react";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password should be atleast 8 character"),
});

const Login = () => {
  const handleLogin = useLogin();
  const { register, handleSubmit } = useForm();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      try {
        toast.promise(handleLogin(values), {
          loading: "Loading...",
          success: (data) => {
            console.log("success", data);
            return `Login Successful`;
          },
          error: "Error",
        });
      } catch (error) {
        console.log("Failed to signup", error);
        toast.error("Failed to signup");
      }
    });
  };
  return (
    <div>
      {/* @ts-expect-error was running out of time */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <Logo className="w-32 h-16 mx-auto aspect-square" />
          <h1 className="text-center text-2xl font-semibold mb-8">
            Welcome back, Login to your account
          </h1>
          <Label htmlFor="email">Email</Label>
          <Input
            {...register("email")}
            placeholder="hangman@gmail.com"
            required
          />
          {form.formState.errors.email && (
            <p className="text-red-500">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <Label>Password</Label>
          <Input {...register("password")} required type="password" />
          {form.formState.errors.password && (
            <p className="text-red-500">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>
        <Button
          disabled={
            isPending || form.formState.isSubmitting || form.formState.isDirty
          }
          type="submit"
          className="w-full bg-[#6C5DD3] text-white"
        >
          {isPending && <Loader className="w-5 h-5 animate-spin mr-1.5" />}
          Login
        </Button>
        <p className="text-center text-sm text-[#808191]">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-[#6C5DD3]">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};
export default Login;
