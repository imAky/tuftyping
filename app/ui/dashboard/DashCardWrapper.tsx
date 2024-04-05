import { BiSolidCoinStack } from "react-icons/bi";
import DashCard from "./DashCard";
import { FaBolt, FaLightbulb, FaPercent } from "react-icons/fa";

export default async function DashCardWrapper() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return (
    <>
      <DashCard
        title="Points"
        icon={<BiSolidCoinStack className="h-4 w-4" />}
        score={100}
      />
      <DashCard
        title="Max Wpm"
        icon={<FaBolt className="h-4 w-4" />}
        score={80}
      />
      <DashCard
        title="Accuracy %"
        icon={<FaPercent className="h-4 w-4" />}
        score={75}
      />
      <DashCard
        title="Match"
        icon={<FaLightbulb className="h-4 w-4" />}
        score={12}
      />
    </>
  );
}
