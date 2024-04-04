import useEngine, { State } from "@/app/hooks/useEngine";
import ResultCard from "../component/ResultCard";
import { ResultButton } from "@/app/ui/component/ResultButton";
import { formattedScore } from "@/app/utils/helpers";
import { GameResultsTypes } from "@/app/lib/definition";

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
import SaveButton from "../component/SaveButton";

const Results = ({
  state,
  gameResults,
  className = "",
  onRestart,
}: {
  state: State;
  gameResults: GameResultsTypes;
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
          score={gameResults.wpmResult.wpm}
          text={`${gameResults.wpmResult.wpm} wpm`}
        />
        <ResultCard
          title="acc"
          icon={<FaPercent />}
          score={gameResults.typingMetrics.accuracy}
          text={`${parseFloat(
            gameResults.typingMetrics.accuracy.toFixed(2)
          )}% (${gameResults.typingMetrics.correctCharacters} correct / ${
            gameResults.typingMetrics.incorrectCharacters
          } incorrect)`}
        />
        <ResultCard
          title="net"
          icon={<LuTarget />}
          score={formattedScore(
            (gameResults.wpmResult.wpm * gameResults.typingMetrics.accuracy) /
              100
          )}
          text={`${parseFloat(
            (
              (gameResults.wpmResult.wpm * gameResults.typingMetrics.accuracy) /
              100
            ).toFixed(2)
          )} wpm (wpm * acc )`}
        />
        <ResultCard
          title="raw"
          icon={<FaLightbulb />}
          score={gameResults.rawWpm}
          text={`raw wpm`}
        />
        <ResultCard
          title="words"
          icon={<LuWholeWord />}
          score={gameResults.wpmResult.correctWords}
          text={`correct words`}
        />
        <ResultCard
          title="characters"
          icon={<LuWholeWord />}
          score={
            gameResults.typingMetrics.totalTyped -
            gameResults.typingMetrics.errors
          }
          text={`correct, incorrect`}
          secondary={gameResults.typingMetrics.errors}
        />
        <ResultCard
          title="key"
          icon={<FaKeyboard />}
          score={
            gameResults.typingMetrics.correctCharacters +
            gameResults.typingMetrics.incorrectCharacters
          }
          text={`keystrokes`}
        />
        <ResultCard
          title="backspace"
          icon={<FaBackward />}
          score={Math.max(
            gameResults.typingMetrics.correctCharacters +
              gameResults.typingMetrics.incorrectCharacters -
              gameResults.typingMetrics.totalTyped,
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
        <SaveButton gameResults={gameResults} />
      </div>
    </div>
  );
};

export default Results;
