import { Document, Schema } from "mongoose";

export interface User extends Document {
  name: string;
  email: string;
  username: string;
  image?: string;
  maxWpm: number;
  totalPoints: number;
  totalMatches: number;
  totalDuration: number;
  totalEarning: number;
  totalRedeemPoints: number;
  todayPoints: number;
  latestScores: Schema.Types.ObjectId[];
}

export interface Score extends Document {
  user: Schema.Types.ObjectId;
  wpm: number;
  acc: number;
  rawWpm: number;
  points: number;
  timeOfTypingTest: number;
}

export interface Transaction extends Document {
  userId: Schema.Types.ObjectId;
  prize: number;
}

export type GameResult = {
  wpm: number;
  rawWpm: number;
  acc: number;
  corrWords: number;
  inCorrWords: number;
  corrChar: number;
  incorrChar: number;
  correctTypeChar: number;
  incorrectTypeChar: number;
  cpm: number;
  timing: number;
  point: number;
};

export type ResponseType = {
  status: boolean;
  message: string;
};

export interface ScoreObject {
  date: Date;
  wpm: number;
  acc: number;
  rawWpm: number;
  points: number;
  timeOfTypingTest: number;
}
