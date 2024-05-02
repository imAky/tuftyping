"use server";

import { getServerSession } from "next-auth";
import User from "../models/User";
import connectDB from "./connection";
import { options } from "../api/auth/[...nextauth]/options";
import { revalidatePath } from "next/cache";
import Transaction from "../models/Transaction";
import { redirect } from "next/navigation";
import mongoose, { startSession } from "mongoose";
import Score from "../models/Score";

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
      throw new Error("User not sign In");
    }
    const email = session.user.email;
    await connectDB();
    const user = await User.findOne({ email }).select(
      "maxWpm totalPoints totalMatches todayPoints totalDuration totalEarning createdAt"
    );
    if (!user) {
      throw new Error("User not found");
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
      totalEarning: user.totalEarning,
      totalDuration: parseFloat(user.totalDuration),
      registrationDate: formattedRegistrationDate,
    };
  } catch (error: any) {
    throw new Error(`fetching user details - ${error.message}`);
  }
}

export async function fetchUserScore() {
  const session = await getServerSession(options);
  try {
    if (!session?.user) {
      throw new Error("User not sign In");
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
    throw new Error(`fetching user score graph: ${error.message}`);
  }
}

export async function fetchLeaderBoard(
  pageNumber: number = 1,
  pageSize: number = 20
) {
  try {
    await connectDB();

    const leaderboard = await User.find({ totalDuration: { $gte: 600 } })
      .select("-_id name username image totalPoints maxWpm")
      .sort({ maxWpm: -1, totalPoints: -1, createdAt: 1 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .lean();
    return leaderboard;
  } catch (error: any) {
    throw new Error(`fetching leaderboard. ${error.message}`);
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
  let mongoSession;

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
    mongoSession = await startSession();
    mongoSession.startTransaction();
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
      },
      { session: mongoSession }
    );

    if (updateResult.modifiedCount !== 1) {
      throw new Error("Redemption failed. Please try again later");
    }

    await Transaction.create({
      userId: user._id,
      prize: parseInt(prize),
    });
    await mongoSession.commitTransaction();
    mongoSession.endSession();
    revalidatePath("/dashboard");
    return {
      message:
        "Redemption complete. We will update you within 48 hours via the Dashboard",
    };
  } catch (error: any) {
    if (mongoSession) {
      mongoSession.abortTransaction();
      mongoSession.endSession();
    }
    return { message: error.message };
  }
}

export async function fetchUserByUsername(username: string) {
  try {
    await connectDB();
    const user = await User.findOne({ username }).select(
      " maxWpm image username name totalPoints totalMatches todayPoints totalDuration totalEarning createdAt"
    );
    if (!user) {
      throw new Error("User not found");
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
      totalEarning: user.totalEarning,
      totalDuration: parseFloat(user.totalDuration),
      registrationDate: formattedRegistrationDate,
      image: user.image,
      name: user.name,
    };
  } catch (error: any) {
    throw new Error(error.message);
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
    throw new Error(error.message);
  }
}

export async function DeleteUserAccount(username?: string) {
  const sessiondata: any = await getServerSession(options);
  if (!sessiondata) {
    throw new Error("User not found");
  }

  let userIdToDelete = sessiondata?.user.id;
  if (username) {
    try {
      const userToDelete = await User.findOne({ username }, { _id: 1 });
      if (!userToDelete) {
        throw new Error("User not found");
      }
      userIdToDelete = userToDelete._id;
    } catch (error: any) {
      return {
        message: error.message,
      };
    }
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    await User.deleteOne({ _id: userIdToDelete }).session(session);
    await Score.deleteMany({ user: userIdToDelete }).session(session);
    await Transaction.deleteMany({ userId: userIdToDelete }).session(session);

    await session.commitTransaction();
    session.endSession();
    return { message: "Account deleted successfully" };
  } catch (error: any) {
    await sessiondata.abortTransaction();
    sessiondata.endSession();
    return {
      message: error.message,
    };
  }
}
