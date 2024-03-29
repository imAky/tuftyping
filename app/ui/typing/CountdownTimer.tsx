import { time } from "console";
import { FaMinus, FaPlus } from "react-icons/fa";

interface TimerProps {
  timeLeft: number;
  adjustTimer: (increment: number) => void;
  state: string;
}
const formatTime = (timeLeft: number): string => {
  if (timeLeft >= 3600) {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  } else if (timeLeft >= 60) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  } else {
    return timeLeft.toString();
  }
};

const CountdownTimer = ({ timeLeft, adjustTimer, state }: TimerProps) => {
  const formattedTime = formatTime(timeLeft);
  return (
    <div className="flex items-center space-x-4 bg-gray-700  tracking-wider mt-10 mb-20 rounded-lg  shadow-md px-4 py-4">
      {state == "start" && (
        <FaMinus
          className="h-3 w-3 cursor-pointer"
          onClick={() => adjustTimer(-1)}
        />
      )}

      <span className="text-2xl text-yellow-400 px-4">
        {state === "finish" ? "Result" : formattedTime}
      </span>

      {state === "start" && (
        <FaPlus
          className="h-3 w-3 cursor-pointer"
          onClick={() => adjustTimer(1)}
        />
      )}
    </div>
  );
};

export default CountdownTimer;
