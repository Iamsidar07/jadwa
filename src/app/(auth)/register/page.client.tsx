"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { z } from "zod";
import { toast } from "sonner";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/svgs";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().min(3, "Name should be atleast 3 character"),
  role: z.string().min(3, "Role should be atleast 3 character"),
  email: z.string().email(),
  password: z.string().min(8, "Password should be atleast 8 character"),
});

const Register = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      role: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    startTransition(async () => {
      try {
        const promise = axios.post("/api/user/register", values);

        toast.promise(promise, {
          loading: "Loading...",
          success: (data) => {
            console.log("success", data);
            return `${values.name} has been added`;
          },
          error: "Error",
        });
        router.push("/login");
      } catch (error) {
        console.log("Failed to signup", error);
        toast.error("Failed to signup");
      }
    });
  };
  return (
    <div>
      {/* @ts-expect-error ran out of time will fix later */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <Logo className="w-32 h-16 mx-auto aspect-square" />
          <h1 className="text-center text-2xl font-semibold">
            Register to your account
          </h1>

          <Label>Name</Label>
          <Input {...register("name")} required />
          {form.formState.errors.name && (
            <p className="text-red-500">{form.formState.errors.name.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <Label>Role</Label>
          <Input {...register("role")} required />
          {form.formState.errors.role && (
            <p className="text-red-500">{form.formState.errors.role.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <Label>email</Label>
          <Input {...register("email")} required type="email" />
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
          Sign Up
        </Button>
        <p className="text-center text-sm text-[#808191]">
          Already have an account?{" "}
          <Link href="/login" className="text-[#6C5DD3]">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};
export default Register;
