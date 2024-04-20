"use server";

import { getServerSession } from "next-auth";
import User from "../models/User";
import connectDB from "./connection";
import { options } from "../api/auth/[...nextauth]/options";
import { unstable_noStore as noStore } from "next/cache";
import { cookies } from "next/headers";

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
      "maxWpm totalPoints totalMatches todayPoints totalDuration createdAt"
    );
    if (!user) {
      throw new Error("User not found in the database");
    }
    const registrationDate = new Date(user.createdAt);
    const day = registrationDate.getDate();
    const month = registrationDate.toLocaleString("en-us", { month: "short" });
    const year = registrationDate.getFullYear();
    const formattedRegistrationDate = `${day} ${month} ${year}`;
    return {
      maxWpm: parseFloat(user.maxWpm.toFixed(2)),
      totalPoints: parseFloat(user.totalPoints),
      totalMatches: parseFloat(user.totalMatches),
      todayPoints: parseFloat(user.todayPoints),
      totalDuration: parseFloat(user.totalDuration),
      registrationDate: formattedRegistrationDate,
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
  pageSize: number = 20
) {
  try {
    await connectDB();
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

export async function fetchUsertotalPoints() {
  const session = await getServerSession(options);
  try {
    if (!session?.user) {
      throw new Error("User not found");
    }
    const email = session.user.email;
    await connectDB();
    const totalPoints = await User.findOne({ email }).select(
      "-_id totalPoints"
    );
    console.log("usertotalPoints", totalPoints);

    return totalPoints;
  } catch (error: any) {
    console.error("Error fetching user Points:", error);
  }
}

export async function RedeemUserPoints(prize: string) {
  const session = await getServerSession(options);
  try {
    if (!session?.user) {
      throw new Error("User not found");
    }
    const email = session.user.email;
    await connectDB();
    const requiredPointsMap: { [key: string]: number } = {
      "50": 10000,
      "100": 20000,
      "200": 30000,
      "500": 50000,
    };
    const requiredPoints = requiredPointsMap[prize];

    const user = await User.findOneAndUpdate(
      { email, totalPoints: { $gte: requiredPoints } },
      { $inc: { totalPoints: -requiredPoints } },
      { new: true }
    );
    if (!user) {
      throw new Error("Insufficient points to redeem");
    }

    return { message: "Redeem complete, check you mail" };
  } catch (error: any) {
    return { message: error.message };
  }
}

export async function fetchUserByUsername(username: string) {
  try {
    await connectDB();
    const user = await User.findOne({ username }).select(
      " maxWpm image username name totalPoints totalMatches todayPoints totalDuration createdAt"
    );
    if (!user) {
      throw new Error("User not found in the database");
    }
    const registrationDate = new Date(user.createdAt);
    const day = registrationDate.getDate();
    const month = registrationDate.toLocaleString("en-us", { month: "short" });
    const year = registrationDate.getFullYear();
    const formattedRegistrationDate = `${day} ${month} ${year}`;
    return {
      maxWpm: parseFloat(user.maxWpm.toFixed(2)),
      totalPoints: parseFloat(user.totalPoints),
      totalMatches: parseFloat(user.totalMatches),
      todayPoints: parseFloat(user.todayPoints),
      totalDuration: parseFloat(user.totalDuration),
      registrationDate: formattedRegistrationDate,
      image: user.image,
      name: user.name,
    };
  } catch (error: any) {
    return { message: error.message };
  }
}

export async function fetchUserScoreByUsername(username: string) {
  try {
    await connectDB();
    const user = await User.findOne({ username }).populate("latestScores");
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
