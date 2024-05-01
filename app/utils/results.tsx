"use server";

import { GameResult } from "../lib/definition";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import Score from "../models/Score";
import User from "../models/User";
import connectDB from "../lib/connection";
import { revalidatePath } from "next/cache";

export const gameResult = async (
  isAdsOn: boolean,
  typeError: number,
  totalCorrChar: string,
  totalTypedCharacter: string,
  totalWordsGenerated: string,
  totalTimeInSeconds: number
): Promise<GameResult> => {
  const session = await getServerSession(options);
  const expectedWords = totalWordsGenerated.trim().split(/\s+/);
  const modifyWords = totalCorrChar.trim().split(/\s+/);
  const typedText = totalTypedCharacter.trim().replace(/\s+/g, "");

  let wpmChar = 0;
  let corrWords = 0;
  let inCorrWords = 0;
  let corrChar = 0;
  let incorrChar = 0;

  let correctTypeChar = typedText.length - typeError;
  let incorrectTypeChar = typeError;

  for (let i = 0; i < expectedWords.length && i < modifyWords.length; i++) {
    const expWord = expectedWords[i];
    const actWord = modifyWords[i];

    if (expWord === actWord) {
      corrWords++;
      wpmChar += actWord.length;
      corrChar += actWord.length;
    } else {
      inCorrWords++;
      for (let j = 0; j < expWord.length && j < actWord.length; j++) {
        if (expWord[j] === actWord[j]) {
          corrChar++;
        } else {
          incorrChar++;
        }
      }
    }
  }

  const avgWpm = wpmChar / 5;

  const avgRaw = corrChar / 5;

  const wpm = (avgWpm / totalTimeInSeconds) * 60;

  const rawWpm = (avgRaw / totalTimeInSeconds) * 60;
  const cpm = (typedText.length / totalTimeInSeconds) * 60;

  const acc = Math.max((correctTypeChar / typedText.length) * 100, 0);

  let point = 0;
  if (wpm >= 25 && acc >= 75 && isAdsOn) {
    const minutes = totalTimeInSeconds / 60;
    point = Math.floor(minutes * 2);
  }

  const gamePoint = {
    wpm: parseFloat(wpm.toFixed(2)),
    rawWpm: parseFloat(rawWpm.toFixed(2)),
    acc: parseFloat(acc.toFixed(2)),
    corrWords,
    inCorrWords,
    corrChar,
    incorrChar,
    correctTypeChar,
    incorrectTypeChar,
    cpm: parseFloat(cpm.toFixed(2)),
    timing: totalTimeInSeconds,
    point,
  };
  if (session && session.user?.email) {
    const email = session.user.email;

    await connectDB();

    try {
      let user = await User.findOne({ email });

      if (!user) {
        {
          user = await User.create({ email, name: session.user.name });
        }
      }

      if (user.latestScores.length >= 3) {
        const oldestScoreId = user.latestScores[0];
        await Score.findByIdAndDelete(oldestScoreId);
        user.latestScores.shift();
      }

      const currentDate = new Date();

      const lastUpdatedDate = user.updatedAt;

      if (
        !lastUpdatedDate ||
        lastUpdatedDate.getDate() !== currentDate.getDate() ||
        lastUpdatedDate.getMonth() !== currentDate.getMonth() ||
        lastUpdatedDate.getFullYear() !== currentDate.getFullYear()
      ) {
        user.todayPoints = 0;
        await user.save();
      }

      const score = await Score.create({
        user: user._id,
        wpm: gamePoint.wpm,
        acc: gamePoint.acc,
        rawWpm: gamePoint.rawWpm,
        points: gamePoint.point,
        timeOfTypingTest: totalTimeInSeconds,
      });

      await User.findByIdAndUpdate(user._id, {
        $inc: {
          totalMatches: 1,
          totalDuration: totalTimeInSeconds,
          totalPoints: point,
          todayPoints: point,
        },
        $push: {
          latestScores: {
            $each: [score._id],
            $slice: -3,
          },
        },
        $max: { maxWpm: wpm },
      });
    } catch (error: any) {
      console.error("Result Error:", error.message);
    }
    revalidatePath("/dashboard");
  }

  return gamePoint;
};
