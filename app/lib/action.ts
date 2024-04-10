"use server";

import { getServerSession } from "next-auth";
import User from "../models/User";
import connectDB from "./connection";
import { options } from "../api/auth/[...nextauth]/options";

export async function fetchUserDetail() {
  const session = await getServerSession(options);
  try {
    if (!session?.user) {
      throw new Error("User not found");
    }
    const email = session.user.email;
    await connectDB();
    const user = await User.findOne({ email }).select(
      "maxWpm totalPoints totalMatches todayPoints"
    );
    if (!user) {
      throw new Error("User not found in the database");
    }
    return {
      maxWpm: user.maxWpm,
      totalPoints: user.totalPoints,
      totalMatches: user.totalMatches,
      todayPoints: user.todayPoints,
    };
  } catch (error: any) {
    console.error("Error fetching user details:", error);
  }
}
