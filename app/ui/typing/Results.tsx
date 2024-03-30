import { motion } from "framer-motion";
import useEngine, { State } from "@/app/hooks/useEngine";
import ResultCard from "../component/ResultCard";
import { ButtonInline } from "@/app/ui/component/Button";
import { formattedScore } from "@/app/utils/helpers";
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

const Results = ({
  state,
  errors,
  gameResults,
  total,
  className = "",
  onRestart,
}: {
  state: State;
  errors: number;
  gameResults: {
    wpmResult: {
      wpm: number;
      correctWords: number;
    };
    rawWpm: number;
    typingMetrics: {
      accuracy: number;
      correctCharacters: number;
      incorrectCharacters: number;
    };
    timing: number;
  };
  total: number;
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
          score={total - errors}
          text={`correct, incorrect`}
          secondary={errors}
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
              total,
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
      <div className="mb-3 ">
        <ButtonInline title="Restart" handleRestart={onRestart} />
        <ButtonInline title="Save" />
      </div>
    </div>
  );
};

export default Results;
