import { dbConnectResponse } from "@/dbConnect/dbConnect";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
dbConnectResponse();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({
        error: true,
        message: "Invalid User Credentials",
      });
    }
    const checkPassword = await bcryptjs.compare(password, user?.password);
    if (!checkPassword) {
      return NextResponse.json({
        error: true,
        message: "Check User Credentials",
      });
    }

    const tokenPayload = {
      id: user?._id,
      username: user?.username,
      email: user?.email,
    };
    const token = await jwt.sign(tokenPayload, process.env.SECRET!, {
      expiresIn: "3h",
    });
    const response = NextResponse.json({
      success: true,
      message: "Login Successfully",
      token,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: true, message: error.message });
  }
}
