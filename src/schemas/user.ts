import { z } from "zod";

export const userRegisterSchema = z.object({
  name: z.string().min(3, "Name should be atleast 3 character"),
  role: z.string().min(3, "Role should be atleast 3 character"),
  email: z.string().email(),
  password: z.string().min(6, "Password should be atleast 6 character"),
});

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password should be atleast 6 character"),
});
