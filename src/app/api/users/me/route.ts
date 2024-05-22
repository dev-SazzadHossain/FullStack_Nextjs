import { dbConnectResponse } from "@/dbConnect/dbConnect";
import { getDecodedToken } from "@/helpers/getDecodedToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
dbConnectResponse();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDecodedToken(request);
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return NextResponse.json({ error: true, message: "Invalid User" });
    }

    const response = NextResponse.json({ success: true, data: user });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: true, message: error?.message });
  }
}
