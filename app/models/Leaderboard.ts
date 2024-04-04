import mongoose, { Schema } from "mongoose";
import { LeaderboardEntry } from "../lib/definition";

const LeaderboardSchema = new Schema<LeaderboardEntry>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    score: { type: Schema.Types.ObjectId, ref: "Score", required: true },
  },
  { timestamps: true }
);

export default mongoose.models.LeaderboardEntry ||
  mongoose.model<LeaderboardEntry>("LeaderboardEntry", LeaderboardSchema);
