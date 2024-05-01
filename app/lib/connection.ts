import mongoose from "mongoose";

let isConnected = false;

export default async function connectDB() {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI as string);

    isConnected = true;
  } catch (error) {
    console.error("MongoDB connection error", error);
    throw new Error("Unable to connect to MongoDB");
  }
}
