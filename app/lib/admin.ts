"use server";

import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import Transaction from "../models/Transaction";

export async function fetchTransactionDetails() {
  const session = await getServerSession(options);

  if (!session || session.user?.email !== process.env.ADMIN_MAIL) {
    redirect("/");
  }

  try {
    const transactions = await Transaction.find().populate({
      path: "userId",
      select: "_id username email",
    });
    return transactions;
  } catch (error: any) {
    return { message: error.message };
    console.log(error.message);
  }
}
