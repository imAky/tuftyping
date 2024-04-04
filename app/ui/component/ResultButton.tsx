import React, { useState } from "react";
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
      className="relative w-48 h-[50px] bg-red-800 px-8 py-2 m-2 rounded-full text-2xl shadow-md text-yellow-500 hover:bg-red-700 tracking-wide"
      onClick={handleRestart}
    >
      {title}
      {showTooltip && (
        <Tooltip toolText="Restart Typing" topPosition="-top-12" />
      )}
    </button>
  );
};
