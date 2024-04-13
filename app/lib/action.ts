"use server";

import { getServerSession } from "next-auth";
import User from "../models/User";
import connectDB from "./connection";
import { options } from "../api/auth/[...nextauth]/options";
import { unstable_noStore as noStore } from "next/cache";
import { cookies } from "next/headers";
import { resolve } from "path";

interface ScoreObject {
  date: Date;
  wpm: number;
  acc: number;
  rawWpm: number;
  points: number;
  timeOfTypingTest: number;
}

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
      maxWpm: parseFloat(user.maxWpm.toFixed(2)),
      totalPoints: parseFloat(user.totalPoints),
      totalMatches: parseFloat(user.totalMatches),
      todayPoints: parseFloat(user.todayPoints),
    };
  } catch (error: any) {
    console.error("Error fetching user details:", error);
  }
}

export async function fetchUserScore() {
  const session = await getServerSession(options);
  try {
    if (!session?.user) {
      throw new Error("User not found");
    }
    const email = session.user.email;
    await connectDB();
    const user = await User.findOne({ email }).populate("latestScores");
    if (!user) {
      throw new Error("User not found");
    }
    const latestScores: ScoreObject[] = user.latestScores.map((score: any) => ({
      date: score.createdAt,
      wpm: score.wpm,
      acc: score.acc,
      rawWpm: score.rawWpm,
      points: score.points,
      timeOfTypingTest: score.timeOfTypingTest,
    }));
    return latestScores;
  } catch (error: any) {
    console.error("Error fetching user details:", error);
  }
}

export async function fetchLeaderBoard(
  pageNumber: number = 1,
  pageSize: number = 18
) {
  try {
    await connectDB();
    console.log("backend connected");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const leaderboard = await User.find()
      .select("-_id name username image totalPoints maxWpm")
      .sort({ maxWpm: -1, totalPoints: -1, createdAt: 1 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .lean();

    return leaderboard;
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
}
