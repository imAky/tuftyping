"use server";

import { getServerSession } from "next-auth";
import Score from "../models/Score";
import User from "../models/User";
import connectDB from "./connection";
import { GameResultsTypes } from "./definition";
import { redirect } from "next/navigation";
import { options } from "../api/auth/[...nextauth]/options";

export async function saveResult(gameResults: GameResultsTypes) {
  const session = await getServerSession(options);
  try {
    if (!session?.user) {
      throw new Error("User not found");
    }

    await connectDB();

    const user = await User.findOne({ email: session.user.email });

    const newScore = new Score({
      user: user._id,
      wpm: gameResults.wpmResult.wpm,
      correctWords: gameResults.wpmResult.correctWords,
      rawWpm: gameResults.rawWpm,
      accuracy: gameResults.typingMetrics.accuracy,
      correctCharacters: gameResults.typingMetrics.correctCharacters,
      incorrectCharacters: gameResults.typingMetrics.incorrectCharacters,
      errorsCount: gameResults.typingMetrics.errors,
      totalTyped: gameResults.typingMetrics.totalTyped,
    });

    await newScore.save();

    return { status: true, message: "Result Saved" };
  } catch (error: any) {
    return { status: false, message: ` Error: ${error?.message} ` };
  }
}
