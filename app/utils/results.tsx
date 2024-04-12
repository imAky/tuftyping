"use server";

import { model } from "mongoose";
import { GameResult } from "../lib/definition";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import Score from "../models/Score";
import User from "../models/User";
import { userAgent } from "next/server";
import connectDB from "../lib/connection";
import { resolve } from "path";

export const gameResult = async (
  modifyChar: string,
  actual: string,
  expected: string,
  totalTimeInSeconds: number
): Promise<GameResult> => {
  const session = await getServerSession(options);

  const expectedWords = expected.trim().split(/\s+/);
  const actualWords = actual.trim().split(/\s+/);
  const typedText = actual.trim();
  const expectedText = expected.trim();
  const modifyText = modifyChar.trim();

  let wpmChar = 0;
  let corrWords = 0;

  let corrChar = 0;
  let incorrChar = 0;

  let errMod = 0;
  let tolType = modifyText.length;

  for (let i = 0; i < Math.min(modifyText.length, expectedText.length); i++) {
    if (modifyText[i] !== expectedText[i]) {
      errMod++;
    }
  }

  for (let i = 0; i < Math.min(typedText.length, expectedText.length); i++) {
    if (typedText[i] === expectedText[i]) {
      corrChar++;
    } else {
      incorrChar++;
    }
  }

  for (let i = 0; i < expectedWords.length && i < actualWords.length; i++) {
    const expWord = expectedWords[i];
    const actWord = actualWords[i];

    if (expWord === actWord) {
      corrWords++;
      wpmChar += expWord.length;
    }
  }

  const avgWpm = wpmChar / 5;
  const avgRaw = corrChar / 5;

  const wpm = (avgWpm / totalTimeInSeconds) * 60;
  const rawWpm = (avgRaw / totalTimeInSeconds) * 60;
  const acc = (corrChar / typedText.length) * 100;

  let point = 1;
  if (wpm >= 10) {
    if (totalTimeInSeconds === 15) {
      point = 2;
    } else if (totalTimeInSeconds === 30) {
      point = 5;
    } else {
      let timefac = totalTimeInSeconds / 10;
      let timemod = timefac % 5;
      if (timemod !== 0 && acc >= 75) {
        point = timefac + Math.abs(5 - timemod);
      } else if (timemod !== 0 && acc < 75) {
        point = timefac - timemod;
      } else if (timemod === 0) {
        point = timefac;
      }
    }
  }

  const gamePoint = {
    wpm: parseFloat(wpm.toFixed(2)),
    rawWpm: parseFloat(rawWpm.toFixed(2)),
    acc: parseFloat(acc.toFixed(2)),
    corrWords,
    corrChar,
    incorrChar,
    errMod,
    tolType,
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

      if (user.latestScores.length >= 7) {
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
            $slice: -7,
          },
        },
        $max: { maxWpm: wpm },
      });
    } catch (error) {
      console.log("Error update user and saving score", error);
    }
  }

  return gamePoint;
};
