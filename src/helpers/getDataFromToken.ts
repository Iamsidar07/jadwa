import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

type Token = {
  id: string;
  name: string;
  role: string;
  profileImageUrl: string;
};

export const getDataFromToken = (req: NextRequest) => {
  try {
    const token = req.cookies.get("token")?.value || "";
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
    return decodedToken as Token;
  } catch (error) {
    throw error;
  }
};
