// let corrChar = 0;
// let incorrChar = 0;
// const typedText =
//   "engineer lirea clothing copy games sisle steel heuiristic hardware unbranded concrete fidigital car hat wirleless director usability reinvent olklahoma brand withdr";
// const expectedText =
//   "engineer lira clothing copy games isle steel heuristic hardware unbranded concrete digital car hat wireless director usability reinvent oklahoma brand withdrawal orchestration account concrete grey senior radial solution adp vertical";
// console.log("typedText", typedText.length);
// console.log("expectedText", expectedText.length);
// console.log(Math.min(typedText.length, expectedText.length));

// for (let i = 0; i < Math.min(typedText.length, expectedText.length); i++) {
//   console.log("type", typedText[i], "expec", expectedText[i]);
//   if (typedText[i] === expectedText[i]) {
//     console.log(typedText[i] === expectedText[i]);
//     corrChar++;
//   } else {
//     incorrChar++;
//   }
// }
// console.log("co", corrChar, "inc", incorrChar);
expectedWords = [
  "engineer",
  "lira",
  "clothing",
  "copy",
  "games",
  "isle",
  "steel",
  "heuristic",
  "hardware",
  "unbranded",
  "concrete",
  "digital",
  "car",
  "hat",
  "wireless",
  "director",
  "usability",
  "reinvent",
  "oklahoma",
  "brand",
  "withdrawal",
  "orchestration",
  "account",
  "concrete",
  "grey",
  "senior",
  "radial",
  "solution",
  "adp",
  "vertical",
];

actualWords = [
  "engineer",
  "lirea",
  "clothing",
  "copy",
  "games",
  "sisle",
  "steel",
  "heuiristic",
  "hardware",
  "unbranded",
  "concrete",
  "fidigital",
  "car",
  "hat",
  "wirleless",
  "director",
  "usability",
  "reinvent",
  "olklahoma",
  "brand",
  "withdr",
];
let wpmChar = 0;
let corrWords = 0;
let totalTimeInSeconds = 60;
let rawWpmChar = 0;

for (let i = 0; i < expectedWords.length && i < actualWords.length; i++) {
  const expWord = expectedWords[i];
  const actWord = actualWords[i];

  if (expWord === actWord) {
    console.log("exp", expWord, "actwo", actWord);
    console.log(expWord.length, actWord.length);
    corrWords++;
    wpmChar += expWord.length;
    rawWpmChar += expWord.length;
    console.log(wpmChar);
    console.log("rawWpm", wpmChar);
  } else {
    console.log("Eror start");
    console.log("exp", expWord, "actwo", actWord);
    console.log(expWord.length, actWord.length);

    for (let j = 0; j < Math.min(expWord.length, actWord.length); j++) {
      if (expWord[j] === actWord[j]) {
        rawWpmChar++;
      }
    }
    console.log("rawWpm", rawWpmChar);

    console.log(wpmChar);
    console.log("Eror End");
  }
}

const avgWpm = wpmChar / 5;
const avgRawWpm = rawWpmChar / 5;
const wpm = (avgWpm / totalTimeInSeconds) * 60;
const rawWpm = (avgRawWpm / totalTimeInSeconds) * 60;

console.log("wpmChar", wpmChar); // Total correct characters in correct words
console.log("rawWpmChar", rawWpmChar); // Total correct characters in all words
console.log("corrWords", corrWords); // Total correct words
console.log("wpm", wpm); // WPM
console.log("rawWpm", rawWpm);
