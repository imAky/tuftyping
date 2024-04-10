import { Document, Schema } from "mongoose";

export interface User extends Document {
  name: string;
  email: string;
  maxWpm: number;
  totalPoints: number;
  totalMatches: number;
  totalDuration: number;
  lastPointsUpdate: Date;
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

export interface LeaderboardEntry extends Document {
  user: Schema.Types.ObjectId;
  score: Schema.Types.ObjectId;
}

export type GameResult = {
  wpm: number;
  rawWpm: number;
  acc: number;
  corrWords: number;
  corrChar: number;
  incorrChar: number;
  errMod: number;
  tolType: number;
  timing: number;
  point: number;
};

export type ResponseType = {
  status: boolean;
  message: string;
};
