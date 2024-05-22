import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";

export const sendMail = async ({ email, emailType, userId }: any) => {
  try {
    const token = Math.floor(Math.random() * 100000);
    if (emailType === "verify") {
      await User.findOneAndUpdate(userId, {
        $set: {
          verifyToken: token,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
    } else if (emailType === "reset") {
      await User.findOneAndUpdate(userId, {
        $set: {
          forgotPasswordToken: token,
          forgotPasswordExpiry: Date.now() + 3600000,
        },
      });
    }
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mainOptions = {
      from: "dev.sazzadhosssain24@gmail.com", // sender address
      to: email, //  receivers
      subject:
        emailType === "verify" ? "Verity Your Email" : "Reset Your Password", // Subject
      html:
        emailType === "verify"
          ? `<p>Click <a href="${
              process.env.DOMAIN
            }/verifyemail?token=${token}">here</a> to ${
              emailType === "verify"
                ? "verify your email"
                : "reset your password"
            }
        or copy and paste the link below in your browser. <br> ${
          process.env.DOMAIN
        }/verifyemail?token=${token}
        </p>`
          : `<p>Click <a href="${
              process.env.DOMAIN
            }/resetpassword?token=${token}">here</a> to ${
              emailType === "verify"
                ? "verify your email"
                : "reset your password"
            }
      or copy and paste the link below in your browser. <br> ${
        process.env.DOMAIN
      }/resetPassword?token=${token}
      </p>`, // html body
    };

    const response = await transporter.sendMail(mainOptions);
    return response;
  } catch (error: any) {
    console.log(error?.message);
  }
};
