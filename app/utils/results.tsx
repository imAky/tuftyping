export interface wpmResult {
  wpm: number;
  correctWords: number;
}

export const countWpm = (
  actual: string,
  expected: string,
  totalTimeInSeconds: number
): wpmResult => {
  const expectedWords = expected.trim().split(/\s+/);
  const actualWords = actual.trim().split(/\s+/);

  let correctCharacters = 0;
  let correctWords = 0;

  for (let i = 0; i < expectedWords.length && i < actualWords.length; i++) {
    const expectedWord = expectedWords[i];
    const actualWord = actualWords[i];

    if (expectedWord === actualWord) {
      correctWords++;
    }

    for (let j = 0; j < Math.min(expectedWord.length, actualWord.length); j++) {
      if (expectedWord[j] === actualWord[j]) {
        correctCharacters++;
      } else {
        break;
      }
    }
  }

  const avgWords = correctCharacters / 5;
  const wpm = Math.round((avgWords / totalTimeInSeconds) * 60);

  return { wpm, correctWords };
};

export const countRawWpm = (
  actual: string,
  expected: string,
  totalTimeInSeconds: number
): number => {
  const expectedWords = expected.trim().split(/\s+/);
  const actualWords = actual.trim().split(/\s+/);

  let totalCharacters = 0;

  for (let i = 0; i < expectedWords.length && i < actualWords.length; i++) {
    const expectedWord = expectedWords[i];
    const actualWord = actualWords[i];

    totalCharacters += Math.max(expectedWord.length, actualWord.length);
  }
  const avgWords = totalCharacters / 5;
  const rawWpm = Math.round(avgWords / (totalTimeInSeconds / 60));
  return rawWpm;
};

export const calculateTypingMetrics = (
  typedText: string,
  expectedText: string
): {
  accuracy: number;
  correctCharacters: number;
  incorrectCharacters: number;
} => {
  typedText = typedText.trim();
  expectedText = expectedText.trim();

  let correctCharacters = 0;
  let incorrectCharacters = 0;
  let accuracy = 0;
  for (let i = 0; i < Math.min(typedText.length, expectedText.length); i++) {
    if (typedText[i] === expectedText[i]) {
      correctCharacters++;
    } else {
      incorrectCharacters++;
    }

    const totalCharacters = typedText.length;
    accuracy = Math.round((correctCharacters / totalCharacters) * 100);
  }

  return {
    accuracy,
    correctCharacters,
    incorrectCharacters,
  };
};
