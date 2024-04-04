import mongoose from "mongoose";

let isConnected = false;

export default async function connectDB() {
  if (isConnected) {
    return;
  }

  try {
    // No need to specify options explicitly as they are defaults in Mongoose 6+
    await mongoose.connect(process.env.MONGODB_URI as string);

    console.log("MongoDB connected");
    isConnected = true;
  } catch (error) {
    console.error("MongoDB connection error", error);
    throw new Error("Unable to connect to MongoDB");
  }
}
