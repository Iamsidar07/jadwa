import { connectToDB } from "@/dbConfig/connectToDB";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { userLoginSchema } from "@/schemas/user";

connectToDB();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const data = userLoginSchema.parse(reqBody);
    const user = await User.findOne({ email: data.email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }
    const isValidPassword = await bcryptjs.compare(
      data.password,
      user.password,
    );
    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 400 },
      );
    }
    // token data
    const tokenData = {
      id: user._id,
      name: user.name,
      role: user.role,
      profileImageUrl: user.profileImageUrl,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });
    // set token into cookie
    const response = NextResponse.json({
      message: "Sign in successfully",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    });
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 },
    );
  }
}
