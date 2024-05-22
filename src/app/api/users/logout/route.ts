import { dbConnectResponse } from "@/dbConnect/dbConnect";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
dbConnectResponse();

export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.json({
      success: true,
      message: "Logout Successfully",
    });
    response.cookies.set("token", "", {
      httpOnly: true,
      secure: true,
      expires: new Date(0),
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: true, message: error?.message });
  }
}
