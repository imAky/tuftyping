import mongoose, { Schema } from "mongoose";
import { Score } from "../lib/definition";

const scoreSchema = new Schema<Score>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    wpm: { type: Number, required: true },
    accuracy: { type: Number, required: true },
    correctWords: { type: Number },
    rawWpm: { type: Number },
    correctCharacters: { type: Number },
    incorrectCharacters: { type: Number },
    errorsCount: { type: Number },
    totalTyped: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.models.Score ||
  mongoose.model<Score>("Score", scoreSchema);
