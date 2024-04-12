import { ReactElement } from "react";

interface DashCardProp {
  title: string;
  icon: ReactElement<SVGAElement>;
  score: number;
  active?: boolean;
}

export default function DashCard({ title, icon, score }: DashCardProp) {
  return (
    <div className="h-40 w-1/6  flex flex-col  bg-[#19254ee5]  my-2 mx-2 drop-shadow-2xl p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <span className="text-lg font-thin text-[#f4edf8f0]">{title}</span>
        <span className="rounded-full bg-yellow-500 p-1 text-red-900 ">
          {icon}
        </span>
      </div>
      <div className=" flex-grow flex items-center ">
        <span className="text-6xl text-[#f4edf8f0]  text-wrap">{score}</span>
      </div>
    </div>
  );
}