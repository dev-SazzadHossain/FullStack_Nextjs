import mongoose from "mongoose";

export const dbConnectResponse = async () => {
  try {
    const response = await mongoose.connect(`${process.env.MONGODB_URI}`);
    const connection = await mongoose.connection;
    connection.on("connected", () => {
      console.log(`Mongodb Connect Successfully ${connection.host}`);
    });
    connection.on("error", (error) => {
      console.log(`Mongodb connection error : `, +error);
      process.exit();
    });
  } catch (error: any) {
    console.log(`Mongodb Connecting error : `, +error);
  }
};
