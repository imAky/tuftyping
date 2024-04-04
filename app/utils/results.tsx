"use server";

import { GameResultsTypes } from "../lib/definition";

export const GameResults = async (
  modifyChar: string,
  actual: string,
  expected: string,
  totalTimeInSeconds: number
): Promise<GameResultsTypes> => {
  const expectedWords = expected.trim().split(/\s+/);
  const actualWords = actual.trim().split(/\s+/);
  const typedText = actual.trim();
  const expectedText = expected.trim();
  const modifyText = modifyChar.trim();

  let corrCharMetric = 0;
  let correctWords = 0;

  //calculating raw
  let rawCharacter = 0;

  // typing Metrics
  let correctCharacters = 0;
  let incorrectCharacters = 0;
  let accuracy = 0;

  // errors
  let errors = 0;
  let totalTyped = modifyText.length;

  for (let i = 0; i < Math.min(modifyText.length, expectedText.length); i++) {
    if (modifyText[i] !== expectedText[i]) {
      errors++;
    }
  }

  for (let i = 0; i < Math.min(typedText.length, expectedText.length); i++) {
    if (typedText[i] === expectedText[i]) {
      correctCharacters++;
    } else {
      incorrectCharacters++;
    }
  }

  for (let i = 0; i < expectedWords.length && i < actualWords.length; i++) {
    const expectedWord = expectedWords[i];
    const actualWord = actualWords[i];

    if (expectedWord === actualWord) {
      correctWords++;
    }
    rawCharacter += Math.max(expectedWord.length, actualWord.length);

    for (let j = 0; j < Math.min(expectedWord.length, actualWord.length); j++) {
      if (expectedWord[j] === actualWord[j]) {
        corrCharMetric++;
      } else {
        break;
      }
    }
  }

  const avgWords = corrCharMetric / 5;
  const avgRawWords = rawCharacter / 5;

  const wpm = (avgWords / totalTimeInSeconds) * 60;

  const totalCharMetric = typedText.length;
  accuracy = (correctCharacters / totalCharMetric) * 100;

  const wpmResult = { wpm: parseFloat(wpm.toFixed(2)), correctWords };
  const rawWpm = Math.round((avgRawWords / totalTimeInSeconds) * 60);
  const typingMetrics = {
    accuracy,
    correctCharacters,
    incorrectCharacters,
    errors,
    totalTyped,
  };

  return { wpmResult, rawWpm, typingMetrics, timing: totalTimeInSeconds };
};
