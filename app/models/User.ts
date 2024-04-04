import mongoose, { Schema } from "mongoose";
import { User } from "../lib/definition";

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    coins: { type: Number, default: 0 },
    totalTimeSpent: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<User>("User", userSchema);
