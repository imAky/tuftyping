import { ReactElement, useState } from "react";
import Tooltip from "./Tooltip";

interface ResultCardProps {
  title: string;
  icon: ReactElement<SVGAElement>;
  score: number;
  text: string;
  secondary?: number;
  iconColor: string;
  titleColor: string;
  headColor: string;
  bodyColor: string;
}

const ResultCard = ({
  title,
  icon,
  score,
  secondary,
  text,
  iconColor,
  titleColor,
  headColor,
  bodyColor,
}: ResultCardProps) => {
  const [showTooltip, setShowToolTip] = useState<boolean>(false);
  return (
    <div
      className={`flex flex-col w-64   mx-4 my-4 rounded-2xl shadow-md relative ${bodyColor}`}
      onMouseEnter={() => setShowToolTip(true)}
      onMouseLeave={() => setShowToolTip(false)}
    >
      {showTooltip && <Tooltip toolText={text} />}
      <div
        className={`flex items-center justify-center  rounded-t-xl p-[6px] gap-3 ${headColor}`}
      >
        <span className={`rounded-full text-xl ${iconColor}`}>{icon}</span>
        <span className={`text-2xl tracking-wider ${titleColor}`}>{title}</span>
      </div>
      <div className="flex justify-center px-1 py-4 overflow-clip">
        <span className="text-slate-100 text-6xl font-medium">
          {Math.round(score)}
          {title === "acc" && <span className="text-4xl">%</span>}
          {title === "time" && "s"}
        </span>
        {secondary !== undefined && (
          <span className="text-slate-100 text-6xl font-medium">
            /{secondary}
          </span>
        )}
      </div>
    </div>
  );
};

export default ResultCard;
