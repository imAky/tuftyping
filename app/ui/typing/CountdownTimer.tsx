import { time } from "console";
import { FaMinus, FaPlus } from "react-icons/fa";
import { formatTime } from "@/app/utils/helpers";

interface TimerProps {
  timeLeft: number;
  adjustTimer: (increment: number) => void;
  state: string;
}

const CountdownTimer = ({ timeLeft, adjustTimer, state }: TimerProps) => {
  const formattedTime = formatTime(timeLeft);
  return (
    <div className="flex items-center space-x-4 bg-gradient-to-r from-red-700 to-rose-800  shadow-2xl drop-shadow-2xl tracking-wider mt-10 mb-20 rounded-lg   px-4 py-4">
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
