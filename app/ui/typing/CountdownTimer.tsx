import { FaMinus, FaPlus } from "react-icons/fa";

interface TimerProps {
  timeLeft: number;
  adjustTimer: (increment: number) => void;
  state: string;
}

const CountdownTimer = ({ timeLeft, adjustTimer, state }: TimerProps) => {
  return (
    <div className="flex items-center space-x-4 bg-gray-700  tracking-wider my-6 rounded-lg  shadow-md px-4 py-4">
      {state == "start" && (
        <FaMinus
          className="h-3 w-3 cursor-pointer"
          onClick={() => adjustTimer(-1)}
        />
      )}

      <span className="text-2xl text-yellow-400 px-4">
        {state === "finish" ? "Result" : timeLeft}
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
