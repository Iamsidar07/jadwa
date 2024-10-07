import { connectToDB } from "@/dbConfig/connectToDB";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { userRegisterSchema } from "@/schemas/user";

connectToDB();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const data = userRegisterSchema.parse(reqBody);
    const user = await User.findOne({ email: data.email });
    if (user) {
      return NextResponse.json(
        { message: "User with this email already exist." },
        { status: 400 },
      );
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(data.password, salt);
    const randomId = Math.floor(Math.random() * 100) + 1;
    const newUser = await User.create({
      ...data,
      password: hashedPassword,
      profileImageUrl: `https://avatar.iran.liara.run/public/${randomId}`,
    });

    return NextResponse.json(newUser, { status: 201 });
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
