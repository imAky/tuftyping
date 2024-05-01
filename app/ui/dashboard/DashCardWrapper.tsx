import { BiSolidCoinStack } from "react-icons/bi";
import DashCard from "./DashCard";
import { FaBolt, FaKeyboard, FaPercent, FaRupeeSign } from "react-icons/fa";

interface DashCardProps {
  totalPoints: number;
  todayPoints: number;
  maxWpm: number;
  totalMatches: number;
  totalEarning: number;
}

export default async function DashCardWrapper({
  totalPoints,
  todayPoints,
  maxWpm,
  totalMatches,
  totalEarning,
}: DashCardProps) {
  return (
    <>
      <DashCard
        title="Points"
        icon={<BiSolidCoinStack className="h-4 w-4" />}
        score={totalPoints}
      />
      <DashCard
        title="Today Points"
        icon={<FaBolt className="h-4 w-4" />}
        score={todayPoints}
      />
      <DashCard
        title="Max Wpm"
        icon={<FaPercent className="h-4 w-4" />}
        score={maxWpm}
      />

      {totalEarning > 0 && (
        <DashCard
          title="Earnings"
          icon={<FaRupeeSign className="h-4 w-4" />}
          score={totalEarning}
        />
      )}
      <DashCard
        title="Matches"
        icon={<FaKeyboard className="h-4 w-4" />}
        score={totalMatches}
      />
    </>
  );
}
