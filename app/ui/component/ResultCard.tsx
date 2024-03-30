"use client";
import { ReactElement, useState } from "react";
import Tooltip from "./Tooltip";

interface ResultCardProps {
  title: string;
  icon: ReactElement<SVGAElement>;
  score: number;
  text: string;
  secondary?: number;
}

const ResultCard = ({
  title,
  icon,
  score,
  secondary,
  text,
}: ResultCardProps) => {
  const [showTooltip, setShowToolTip] = useState<boolean>(false);
  return (
    <div
      className="flex flex-col w-64   bg-yellow-600 mx-4 my-4 rounded-xl shadow-md relative"
      onMouseEnter={() => setShowToolTip(true)}
      onMouseLeave={() => setShowToolTip(false)}
    >
      {showTooltip && <Tooltip toolText={text} />}
      <div className="flex items-center justify-center bg-red-800 rounded-t-xl p-1 gap-3">
        <span className="rounded-full bg-yellow-500 p-1 text-red-900">
          {icon}
        </span>
        <span className="text-2xl tracking-wider">{title}</span>
      </div>
      <div className="flex justify-center p-2">
        <span className="text-red-900 text-6xl font-medium">
          {Math.round(score)}
          {title === "acc" && "%"}
          {title === "time" && "s"}
        </span>
        {secondary && (
          <span className="text-red-900 text-6xl font-medium">
            /{secondary}
          </span>
        )}
      </div>
    </div>
  );
};

export default ResultCard;
