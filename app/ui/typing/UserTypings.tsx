import cn from "classnames";
import Caret from "./Caret";
import { useEffect } from "react";
import { useSound } from "@/app/context/typing/SoundContext";

const UserTypings = ({
  userInput,
  words,
  className = "",
}: {
  userInput: string;
  words: string;
  className?: string;
}) => {
  const typedCharacters = userInput.split("");

  return (
    <div className={`${className}  `}>
      {typedCharacters.map((char, index) => (
        <Character
          key={`${char}_${index}`}
          actual={char}
          expected={words[index]}
        />
      ))}
      <Caret />
    </div>
  );
};

const Character = ({
  actual,
  expected,
}: {
  actual: string;
  expected: string;
}) => {
  const isCorrect = actual.toLocaleLowerCase() === expected.toLocaleLowerCase();
  const isWhiteSpace = expected === " ";
  const { isMuted } = useSound();

  useEffect(() => {
    const playTypingSound = () => {
      const audio = new Audio("/sounds/typingsound4.wav");
      audio.pause(); // Pause previous sound
      audio.currentTime = 0; // Reset audio to the beginning
      audio.play();
    };

    const playErrorSound = () => {
      const audio = new Audio("/sounds/typingsound2.wav");
      audio.pause(); // Pause previous sound
      audio.currentTime = 0; // Reset audio to the beginning
      audio.play();
    };

    if (!isMuted) {
      if (isCorrect) {
        playTypingSound();
      } else {
        playErrorSound();
      }
    }
  }, [isCorrect, isMuted]);

  return (
    <span
      className={`${isCorrect && !isWhiteSpace && "text-yellow-300"} ${
        !isCorrect && !isWhiteSpace && "text-red-400 "
      } ${!isCorrect && isWhiteSpace && "bg-red-500/50"}`}
    >
      {expected}
    </span>
  );
};

export default UserTypings;
