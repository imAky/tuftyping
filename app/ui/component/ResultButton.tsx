import { useState } from "react";
import Tooltip from "./Tooltip";

interface ButtonProps {
  title: string;

  handleRestart?: () => void;
}

export const ResultButton = ({ title, handleRestart }: ButtonProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };
  const handleMouseLeave = () => {
    setShowTooltip(false);
  };
  return (
    <button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-48 h-[50px] bg-gradient-to-r from-red-700 to-rose-800 px-12 py-2 m-2 rounded-full text-2xl drop-shadow-2xl shadow-md text-slate-100 font-medium hover:to-rose-600 tracking-widest"
      onClick={handleRestart}
    >
      {title}
      {showTooltip && (
        <Tooltip toolText="Restart Typing" topPosition="-top-12" />
      )}
    </button>
  );
};
