import mongoose, { Schema } from "mongoose";
import { Transaction } from "../lib/definition";

const TransactionSchema = new Schema<Transaction>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    prize: { type: Number, required: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export default mongoose.models.Transaction ||
  mongoose.model<Transaction>("Transaction", TransactionSchema);
