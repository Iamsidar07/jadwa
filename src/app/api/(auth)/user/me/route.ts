import { connectToDB } from "@/dbConfig/connectToDB";
import User from "@/models/User";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

connectToDB();

export async function GET(req: NextRequest) {
  try {
    const data = getDataFromToken(req);
    const user = await User.findById(data.id).select("-password");
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 },
    );
  }
}
