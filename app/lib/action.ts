"use server";

import { getServerSession } from "next-auth";
import User from "../models/User";
import connectDB from "./connection";
import { options } from "../api/auth/[...nextauth]/options";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import Transaction from "../models/Transaction";
import { redirect } from "next/dist/server/api-utils";

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
      "50": 5000,
      "100": 10000,
      "200": 15000,
      "500": 25000,
    };

    const user = await User.findOne({ email }).select(
      "totalDuration totalRedeemPoints createdAt totalPoints"
    );

    if (!user) {
      throw new Error("Failed to fetch user details");
    }

    const requiredPoints = requiredPointsMap[prize];

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 14);
    const isThirtyDaysOld = user.createdAt <= thirtyDaysAgo;
    const daysLeftForRedemption = isThirtyDaysOld
      ? 0
      : Math.ceil(
          (user.createdAt.getTime() - thirtyDaysAgo.getTime()) /
            (1000 * 3600 * 24)
        );

    if (!isThirtyDaysOld) {
      throw new Error(
        `Account must be at least 15 days old for redemption. You need to wait ${daysLeftForRedemption} days before redeeming.
        `
      );
    }

    if (
      user.totalDuration - (user.totalRedeemPoints / 2) * 60 <
      (requiredPoints / 2) * 60
    ) {
      throw new Error("Insufficient practice time for redemption");
    }

    if (user.totalPoints < requiredPoints) {
      throw new Error("You do not have enough points for redemption");
    }

    const updateResult = await User.updateOne(
      {
        _id: user._id,
        totalPoints: { $gte: requiredPoints },
      },
      {
        $inc: {
          totalPoints: -requiredPoints,
          totalRedeemPoints: requiredPoints,
        },
      }
    );

    if (updateResult.modifiedCount !== 1) {
      throw new Error("Redemption failed. Please try again later");
    }

    await Transaction.create({
      userId: user._id,
      prize: parseInt(prize),
    });

    revalidatePath("/dashboard");
    return {
      message:
        "Redemption complete. We will update you within 10 days via the Dashboard",
    };
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
