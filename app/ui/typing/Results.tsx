import useEngine, { State } from "@/app/hooks/useEngine";
import ResultCard from "../component/ResultCard";
import { ResultButton } from "@/app/ui/component/ResultButton";
import { GameResult } from "@/app/lib/definition";
import { FaBolt, FaKeyboard, FaLightbulb, FaRegClock } from "react-icons/fa";
import { LuWholeWord } from "react-icons/lu";
import { SiTarget } from "react-icons/si";
import { ImCross } from "react-icons/im";
import { MdAutoGraph } from "react-icons/md";
import { MdCenterFocusStrong } from "react-icons/md";

const Results = ({
  state,
  gameResults,
  onRestart,
}: {
  state: State;
  gameResults: GameResult;
  onRestart?: () => void;
}) => {
  const { restart } = useEngine();

  if (state !== "finish") {
    return null;
  }

  return (
    <div className="flex flex-col text-center w-11/12 max-w-5xl sm:mx-8 my-8  py-4 rounded-2xl ">
      <div className="flex flex-wrap   justify-evenly  ">
        <ResultCard
          title="wpm"
          icon={<FaBolt />}
          score={gameResults.wpm}
          text={`${gameResults.wpm} wpm`}
          iconColor="text-yellow-500"
          titleColor="text-fuchsia-400"
          headColor="bg-fuchsia-900"
          bodyColor="bg-fuchsia-600"
        />
        <ResultCard
          title="acc"
          icon={<SiTarget />}
          score={gameResults.acc}
          text={`${parseFloat(gameResults.acc.toFixed(2))}% (${
            gameResults.correctTypeChar
          } correct / ${gameResults.incorrectTypeChar} incorrect)`}
          iconColor="text-yellow-500"
          titleColor="text-yellow-600"
          headColor="bg-yellow-800"
          bodyColor="bg-yellow-600"
        />
        <ResultCard
          title="points"
          icon={<MdAutoGraph className="h-6 w-6 font-medium" />}
          score={gameResults.point}
          text={`Total Points : ${gameResults.point}`}
          iconColor="text-yellow-500"
          titleColor="text-pink-400"
          headColor="bg-pink-800"
          bodyColor="bg-pink-600"
        />
        <ResultCard
          title="raw"
          icon={<FaLightbulb />}
          score={gameResults.rawWpm}
          text={`${gameResults.rawWpm} raw wpm`}
          iconColor="text-yellow-500"
          titleColor="text-emerald-400"
          headColor="bg-emerald-800"
          bodyColor="bg-emerald-600"
        />
        <ResultCard
          title="cpm"
          icon={<FaKeyboard />}
          score={gameResults.cpm}
          text={`${gameResults.cpm} character per minute`}
          iconColor="text-yellow-500"
          titleColor="text-[#1cb3c7]"
          headColor="bg-[#0d6672]"
          bodyColor="bg-[#19a8bb]"
        />
        <ResultCard
          title="characters"
          icon={<MdCenterFocusStrong className="" />}
          score={gameResults.corrChar}
          text={`${gameResults.corrChar} correct, ${gameResults.incorrChar} incorrect`}
          secondary={gameResults.incorrChar}
          iconColor="text-yellow-500"
          titleColor="text-[#ff926d]"
          headColor="bg-[#ad411d]"
          bodyColor="bg-[#fb6330]"
        />
        <ResultCard
          title="words"
          icon={<LuWholeWord />}
          score={gameResults.corrWords}
          text={`${gameResults.corrWords} correct words`}
          iconColor="text-yellow-500"
          titleColor="text-[#87a6ea]"
          headColor="bg-[#4a6296]"
          bodyColor="bg-[#7c9adc]"
        />
        <ResultCard
          title="incorrect"
          icon={<ImCross className="h-4 w-4" />}
          score={gameResults.inCorrWords}
          text={`${gameResults.inCorrWords} incorrect words`}
          iconColor="text-yellow-500"
          titleColor="text-rose-400"
          headColor="bg-rose-800"
          bodyColor="bg-rose-600"
        />
        <ResultCard
          title="time"
          icon={<FaRegClock />}
          score={gameResults.timing}
          text={`${gameResults.timing}s`}
          iconColor="text-yellow-500"
          titleColor="text-[#e66acf]"
          headColor="bg-[#8e237b]"
          bodyColor="bg-[#c431a9]"
        />
      </div>
      <div className="mb-3 flex justify-center mt-6">
        <ResultButton title="Restart" handleRestart={onRestart}></ResultButton>
      </div>
    </div>
  );
};

export default Results;
