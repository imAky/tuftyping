// // let corrChar = 0;
// // let incorrChar = 0;
// // const typedText =
// //   "engineer lirea clothing copy games sisle steel heuiristic hardware unbranded concrete fidigital car hat wirleless director usability reinvent olklahoma brand withdr";
// // const expectedText =
// //   "engineer lira clothing copy games isle steel heuristic hardware unbranded concrete digital car hat wireless director usability reinvent oklahoma brand withdrawal orchestration account concrete grey senior radial solution adp vertical";
// // console.log("typedText", typedText.length);
// // console.log("expectedText", expectedText.length);
// // console.log(Math.min(typedText.length, expectedText.length));

// // for (let i = 0; i < Math.min(typedText.length, expectedText.length); i++) {
// //   console.log("type", typedText[i], "expec", expectedText[i]);
// //   if (typedText[i] === expectedText[i]) {
// //     console.log(typedText[i] === expectedText[i]);
// //     corrChar++;
// //   } else {
// //     incorrChar++;
// //   }
// // }
// // console.log("co", corrChar, "inc", incorrChar);
// expectedWords = [
//   "engineer",
//   "lira",
//   "clothing",
//   "copy",
//   "games",
//   "isle",
//   "steel",
//   "heuristic",
//   "hardware",
//   "unbranded",
//   "concrete",
//   "digital",
//   "car",
//   "hat",
//   "wireless",
//   "director",
//   "usability",
//   "reinvent",
//   "oklahoma",
//   "brand",
//   "withdrawal",
//   "orchestration",
//   "account",
//   "concrete",
//   "grey",
//   "senior",
//   "radial",
//   "solution",
//   "adp",
//   "vertical",
// ];

// actualWords = [
//   "engineer",
//   "lirea",
//   "clothing",
//   "copy",
//   "games",
//   "sisle",
//   "steel",
//   "heuiristic",
//   "hardware",
//   "unbranded",
//   "concrete",
//   "fidigital",
//   "car",
//   "hat",
//   "wirleless",
//   "director",
//   "usability",
//   "reinvent",
//   "olklahoma",
//   "brand",
//   "withdr",
// ];
// let wpmChar = 0;
// let corrWords = 0;
// let totalTimeInSeconds = 60;
// let rawWpmChar = 0;

// for (let i = 0; i < expectedWords.length && i < actualWords.length; i++) {
//   const expWord = expectedWords[i];
//   const actWord = actualWords[i];

//   if (expWord === actWord) {
//     console.log("exp", expWord, "actwo", actWord);
//     console.log(expWord.length, actWord.length);
//     corrWords++;
//     wpmChar += expWord.length;
//     rawWpmChar += expWord.length;
//     console.log(wpmChar);
//     console.log("rawWpm", wpmChar);
//   } else {
//     console.log("Eror start");
//     console.log("exp", expWord, "actwo", actWord);
//     console.log(expWord.length, actWord.length);

//     for (let j = 0; j < Math.min(expWord.length, actWord.length); j++) {
//       if (expWord[j] === actWord[j]) {
//         rawWpmChar++;
//       }
//     }
//     console.log("rawWpm", rawWpmChar);

//     console.log(wpmChar);
//     console.log("Eror End");
//   }
// }

// const avgWpm = wpmChar / 5;
// const avgRawWpm = rawWpmChar / 5;
// const wpm = (avgWpm / totalTimeInSeconds) * 60;
// const rawWpm = (avgRawWpm / totalTimeInSeconds) * 60;

// console.log("wpmChar", wpmChar); // Total correct characters in correct words
// console.log("rawWpmChar", rawWpmChar); // Total correct characters in all words
// console.log("corrWords", corrWords); // Total correct words
// console.log("wpm", wpm); // WPM
// console.log("rawWpm", rawWpm);

// const expectedText = "lazydog";
// const typedText = "lazysdog";
// let correctCharacters = 0;
// let typoDetected = false;

// // Find the index of the typo (if any)
// const typoIndex = typedText.indexOf("s");

// // Iterate through each character in both strings
// for (
//   let i = 0, j = 0;
//   i < expectedText.length && j < typedText.length;
//   i++, j++
// ) {
//   // If a typo is detected, skip over the incorrect character in typedText
//   if (!typoDetected && expectedText[i] !== typedText[j]) {
//     typoDetected = true;
//     j = typoIndex; // Move j to the typo index
//   }

//   // If the current characters match, count it as correct
//   if (expectedText[i] === typedText[j]) {
//     correctCharacters++;
//   }
// }

// console.log("Number of correct characters typed:", correctCharacters);

// console.log("Number of correct characters typed:", correctCharacters);

// const timevalue = [
//   15, 30, 60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720, 780, 840,
//   900, 960, 1020, 1080, 1140, 1200,
// ];
// for (let i = 0; i < timevalue.length; i++) {
//   let totalTimeInSeconds = timevalue[i];

//   let point = 0;
//   let wpm = 25;
//   let acc = 75;
//   if (wpm >= 25 && acc >= 75) {
//     const minutes = totalTimeInSeconds / 60;
//     point = Math.floor(minutes * 2);
//     console.log("minutes points", minutes, point);
//   }
// }
