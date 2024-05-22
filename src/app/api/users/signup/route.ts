import { dbConnectResponse } from "@/dbConnect/dbConnect";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendMail } from "@/helpers/mailer";

dbConnectResponse();

export async function POST(request: NextRequest) {
  try {
    const userData: { username: string; email: string; password: string } =
      await request.json();
    const { username, email, password } = userData || {};
    // check user is exist
    const userExist = await User.findOne({ email });
    if (userExist) {
      return NextResponse.json({ error: true, message: "User already Exists" });
    }
    // hashing password bcrypt js
    const genSlat = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, genSlat);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await user.save({ validationBeforeSave: false });

    // send mail
    const responseMail = await sendMail({
      email,
      emailType: "verify",
      userId: savedUser?._id,
    });

    return NextResponse.json({
      success: true,
      message: "User Register Successfully",
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: true, errorMessage: error?.message });
  }
}
