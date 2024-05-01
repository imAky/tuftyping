"use server";

import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import Transaction from "../models/Transaction";
import { formatDate } from "../utils/helpers";
import mongoose, { startSession } from "mongoose";
import User from "../models/User";
import { revalidatePath } from "next/cache";

export async function fetchTransactionDetails() {
  const session = await getServerSession(options);

  if (!session || session.user?.email !== process.env.ADMIN_MAIL) {
    redirect("/");
  }

  try {
    const formattedTransactions = await Transaction.find()
      .sort({ createdAt: -1 })
      .select("_id createdAt prize")
      .populate({
        path: "userId",
        select: "_id username email",
      });

    const transactions = formattedTransactions.map((transaction) => {
      const plainTransaction = transaction.toObject();
      return {
        transactionId: plainTransaction._id.toString(),
        prize: plainTransaction.prize,
        createdAt: formatDate(plainTransaction.createdAt),
        user: {
          userId: plainTransaction.userId._id.toString(),
          username: plainTransaction.userId.username,
          email: plainTransaction.userId.email,
        },
      };
    });

    return transactions;
  } catch (error: any) {
    return { message: error.message };
  }
}

export async function ProcessTransaction(
  transactionId: string,
  userId: string,
  prize: number
) {
  const session = await getServerSession(options);

  if (!session || session.user?.email !== process.env.ADMIN_MAIL) {
    redirect("/");
  }

  const mongoSession = await startSession();
  mongoSession.startTransaction();

  try {
    const mongoTransactionId = new mongoose.Types.ObjectId(transactionId);
    const mongoUserId = new mongoose.Types.ObjectId(userId);

    const updateResult = await User.findByIdAndUpdate(
      mongoUserId,
      { $inc: { totalEarning: prize } },
      { session: mongoSession }
    );

    if (!updateResult) {
      throw new Error("Failed to update user's totalEarning");
    }
    const deleteTransaction = await Transaction.findByIdAndDelete(
      mongoTransactionId,
      { session: mongoSession }
    );

    if (!deleteTransaction) {
      throw new Error("Failed to delete transaction");
    }
    await mongoSession.commitTransaction();
    mongoSession.endSession();
    revalidatePath("/console");
    return { message: "Transaction proceed successfully" };
  } catch (error: any) {
    mongoSession.abortTransaction();
    mongoSession.endSession();
    return { message: error.message };
  }
}
