import mongoose, { Schema } from "mongoose";
import { User } from "../lib/definition";

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    image: { type: String },
    maxWpm: { type: Number, default: 0 },
    totalPoints: { type: Number, default: 0 },
    totalMatches: { type: Number, default: 0 },
    totalDuration: { type: Number, default: 0 },
    todayPoints: { type: Number, default: 0 },
    latestScores: [{ type: Schema.Types.ObjectId, ref: "Score" }],
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<User>("User", userSchema);
