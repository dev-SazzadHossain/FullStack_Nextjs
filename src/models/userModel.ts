import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Provide a valid username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Provide a valid email"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "provide a valid password"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
