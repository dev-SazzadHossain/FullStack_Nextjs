import { dbConnectResponse } from "@/dbConnect/dbConnect";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
dbConnectResponse();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    const user = await User.findOne({
      $and: [
        { verifyToken: token },
        { verifyTokenExpiry: { $gt: Date.now() } },
      ],
    });
    if (!user) {
      return NextResponse.json({ error: true, message: "Invalid Token" });
    }
    user.verify = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    const response = await user.save({ validationBeforeSave: false });

    return NextResponse.json({
      success: true,
      message: "Email Verify Successfully",
      data: response,
    });
  } catch (error: any) {
    return NextResponse.json({ error: true, message: error.message });
  }
}
