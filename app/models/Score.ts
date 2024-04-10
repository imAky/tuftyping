import mongoose, { Schema } from "mongoose";
import { Score } from "../lib/definition";

const scoreSchema = new Schema<Score>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    wpm: { type: Number, default: 0 },
    acc: { type: Number, default: 0 },
    rawWpm: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
    timeOfTypingTest: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Score ||
  mongoose.model<Score>("Score", scoreSchema);
