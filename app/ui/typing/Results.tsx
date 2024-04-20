import useEngine, { State } from "@/app/hooks/useEngine";
import ResultCard from "../component/ResultCard";
import { ResultButton } from "@/app/ui/component/ResultButton";
import { formattedScore } from "@/app/utils/helpers";
import { GameResult } from "@/app/lib/definition";

import {
  FaBackward,
  FaBolt,
  FaKeyboard,
  FaLightbulb,
  FaPercent,
  FaRegClock,
} from "react-icons/fa";
import { LuTarget, LuWholeWord } from "react-icons/lu";
import { randomBytes } from "crypto";
// import SaveButton from "../component/SaveButton";

const Results = ({
  state,
  gameResults,
  className = "",
  onRestart,
}: {
  state: State;
  gameResults: GameResult;
  className?: string;
  onRestart?: () => void;
}) => {
  const { restart } = useEngine();

  if (state !== "finish") {
    return null;
  }

  return (
    <div className="flex flex-col text-center w-11/12 max-w-5xl mx-8 my-8  py-4 rounded-2xl ">
      <div className="flex flex-wrap   justify-evenly  ">
        <ResultCard
          title="wpm"
          icon={<FaBolt />}
          score={gameResults.wpm}
          text={`${gameResults.wpm} wpm`}
        />
        <ResultCard
          title="acc"
          icon={<FaPercent />}
          score={gameResults.acc}
          text={`${parseFloat(gameResults.acc.toFixed(2))}% (${
            gameResults.corrChar
          } correct / ${gameResults.incorrChar} incorrect)`}
        />
        <ResultCard
          title="points"
          icon={<LuTarget />}
          score={gameResults.point}
          text={`Total Points : ${gameResults.point}`}
        />
        <ResultCard
          title="raw"
          icon={<FaLightbulb />}
          score={gameResults.rawWpm}
          text={`${gameResults.rawWpm} raw`}
        />
        <ResultCard
          title="words"
          icon={<LuWholeWord />}
          score={gameResults.corrWords}
          text={`correct words`}
        />
        <ResultCard
          title="characters"
          icon={<LuWholeWord />}
          score={gameResults.tolType - gameResults.errMod}
          text={`correct, incorrect`}
          secondary={gameResults.errMod}
        />
        <ResultCard
          title="key"
          icon={<FaKeyboard />}
          score={gameResults.corrChar + gameResults.incorrChar}
          text={`keystrokes`}
        />
        <ResultCard
          title="backspace"
          icon={<FaBackward />}
          score={Math.max(
            gameResults.corrChar + gameResults.incorrChar - gameResults.tolType,
            0
          )}
          text={`backspace`}
        />
        <ResultCard
          title="time"
          icon={<FaRegClock />}
          score={gameResults.timing}
          text={`${gameResults.timing}s`}
        />
      </div>
      <div className="mb-3 flex justify-center">
        <ResultButton title="Restart" handleRestart={onRestart}></ResultButton>
      </div>
    </div>
  );
};

export default Results;
