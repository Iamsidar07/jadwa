"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const getCurrentUser = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value || "";
  if (!token) {
    return null;
  }
  const decodedToken = await jwt.verify(token, process.env.JWT_SECRET!);
  console.log(decodedToken);
  return decodedToken;
};
