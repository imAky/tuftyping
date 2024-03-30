export const isKeyboardCodeAllowed = (code: string) => {
  const result =
    code.startsWith("Key") ||
    code.startsWith("Digit") ||
    code === "Backspace" ||
    code === "Space";
  console.log(result);
  console.log(code);
  return result;
};

export const countErrors = (actual: string, expected: string) => {
  const expectedCharacters = expected.split("");
  return expectedCharacters.reduce((errors, expectedChar, i) => {
    const actualChar = actual[i];
    if (actualChar !== expectedChar) {
      errors++;
    }
    return errors;
  }, 0);
};

export const formattedScore = (score: number) => {
  return parseFloat(score.toFixed(2));
};

// export const countWpm = (actual: string, expected: string): number => {
//   // Remove any leading or trailing white spaces and split the strings into arrays of words
//   const actualWords = actual.trim().split(/\s+/);
//   const expectedWords = expected.trim().split(/\s+/);

//   // Calculate the number of correctly typed characters
//   const actualChars = actual.replace(/\s/g, "").length;
//   const expectedChars = expected.replace(/\s/g, "").length;

//   // Calculate the WPM
//   const wpm = (actualChars / 5 / (expectedChars / 5)) * 60;

//   // Return the calculated WPM
//   return wpm;
// };

// export const calculateAccuracyPercentage = (errors: number, total: number) => {
//   if (total > 0) {
//     const corrects = total - errors;
//     return (corrects / total) * 100;
//   }
// };

// export const formatPercentage = (percentage: number) => {
//   return percentage.toFixed(0) + "%";
// };
