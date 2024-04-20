import { BiSolidCoinStack } from "react-icons/bi";
import DashCard from "./DashCard";
import { FaBolt, FaLightbulb, FaPercent } from "react-icons/fa";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

interface DashCardProps {
  totalPoints: number;
  todayPoints: number;
  maxWpm: number;
  totalMatches: number;
}

export default async function DashCardWrapper({
  totalPoints,
  todayPoints,
  maxWpm,
  totalMatches,
}: DashCardProps) {
  //await new Promise((resolve) => setTimeout(resolve, 3000));

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
      <DashCard
        title="Matches"
        icon={<FaLightbulb className="h-4 w-4" />}
        score={totalMatches}
      />
    </>
  );
}
