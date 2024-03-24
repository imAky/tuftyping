"use client";
import { useEffect, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

interface TimerProps {
  duration: number;
  setDuration: (duration: number) => void;
  onFinish: () => void;
  startTimer: boolean;
  initialDuration: number;
}
const Timer = ({
  duration,
  setDuration,
  onFinish,
  startTimer,
  initialDuration,
}: TimerProps) => {
  const timerValue = [15, 30, 60, 120, 180, 240, 300, 360];
  const [timerIndex, setTimerIndex] = useState<number>(
    timerValue.indexOf(duration)
  );
  const [timer, setTimer] = useState<number>(duration);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (startTimer && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            console.log("Inside useEffect");
            onFinish();
            return initialDuration;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [startTimer, timer]);

  const adjustTimer = (increment: number) => {
    const newIndex = timerIndex + increment;
    if (newIndex >= 0 && newIndex < timerValue.length) {
      setTimerIndex(newIndex);
      setTimer(timerValue[newIndex]);
      setDuration(timerValue[newIndex]);
    }
  };

  return (
    <div className="flex items-center space-x-4 bg-gray-700  tracking-wider my-6 rounded-lg  shadow-md px-4 py-4">
      {!startTimer && (
        <FaMinus
          className="h-3 w-3 cursor-pointer"
          onClick={() => adjustTimer(-1)}
        />
      )}

      <span className="text-2xl text-yellow-400 px-4">{timer}</span>

      {!startTimer && (
        <FaPlus
          className="h-3 w-3 cursor-pointer"
          onClick={() => adjustTimer(1)}
        />
      )}
    </div>
  );
};

export default Timer;
