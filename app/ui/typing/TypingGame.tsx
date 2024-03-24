"use client";
import { useEffect, useState } from "react";
import { MdRefresh } from "react-icons/md";
import Timer from "@/app/ui/typing/Timer";

const TypingGame = () => {
  const initialTimerDuration = 15;
  const [timerDuration, setTimerDuration] =
    useState<number>(initialTimerDuration);
  const [startTimer, setStartTimer] = useState<boolean>(true);
  const [text, setText] = useState<string>(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in massa risus. Nullam orci augue, feugiat vel magna congue, ultrices ornare risus. Aliquam non commodo turpis, eu lobortis justo. Cras viverra ullamcorper consectetur. Donec ipsum dolor, vulputate sit amet semper a, sagittis vel libero."
  );
  const [typedText, setTypedText] = useState<string>("");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === " ") {
        event.preventDefault();
      }
      const updatedText = typedText + event.key;
      setTypedText(updatedText);
      console.log(event.key);
    };

    document.body.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
    };
  }, [startTimer, typedText]);

  const handleTimerFinish = () => {
    console.log("Timer finished!");
    setStartTimer(false);
  };

  const words = text.split(" ");
  return (
    <div className="flex flex-col items-center w-full h-full">
      <Timer
        duration={timerDuration}
        setDuration={setTimerDuration}
        onFinish={handleTimerFinish}
        startTimer={startTimer}
        initialDuration={initialTimerDuration}
      />
      {/* Typing Text Container */}
      <div className="w-full sm:w-3/4 max-w-[1600px] flex justify-center items-center m-12">
        <div className="p-8 text-xl tracking-widest leading-10  bg-gray-700 rounded-lg text-left shadow-md  border-gray-300">
          {words.map((word, index) => (
            <span key={index}>
              {word.split("").map((char, charIndex) => (
                <span
                  key={charIndex}
                  className={
                    typedText[charIndex] === char
                      ? "text-yellow-400"
                      : typedText[charIndex]
                      ? "text-red-500"
                      : ""
                  }
                >
                  {char}
                </span>
              ))}{" "}
            </span>
          ))}
        </div>
      </div>
      <MdRefresh className="h-6 w-6" />
    </div>
  );
};

export default TypingGame;
