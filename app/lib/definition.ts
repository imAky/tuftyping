import { Document, Schema } from "mongoose";

export interface User extends Document {
  name: string;
  email: string;
  coins: number;
  totalTimeSpent: number;
}

export interface Score extends Document {
  user: Schema.Types.ObjectId;
  wpm: number;
  correctWords?: number;
  rawWpm?: number;
  accuracy: number;
  correctCharacters?: number;
  incorrectCharacters?: number;
  errorsCount?: number;
  totalTyped?: number;
}

export interface LeaderboardEntry extends Document {
  user: Schema.Types.ObjectId;
  score: Schema.Types.ObjectId;
}

export type GameResultsTypes = {
  wpmResult: {
    wpm: number;
    correctWords: number;
  };
  rawWpm: number;
  typingMetrics: {
    accuracy: number;
    correctCharacters: number;
    incorrectCharacters: number;
    errors: number;
    totalTyped: number;
  };
  timing: number;
};

export type ResponseType = {
  status: boolean;
  message: string;
};
