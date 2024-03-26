import { motion } from "framer-motion";
import { State } from "@/app/hooks/useEngine";

const Results = ({
  state,
  errors,
  gameResults,
  total,
  className = "",
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
}) => {
  if (state !== "finish") {
    return null;
  }

  return <div></div>;
};

export default Results;

{
  /* <ul>
      <li>{errors}</li>
      <li>{total}</li>
      <li>{gameResults.wpmResult.wpm}</li>
      <li>{gameResults.wpmResult.correctWords}</li>
      <li>{gameResults.rawWpm}</li>
      <li>{gameResults.timing}</li>
      <li>{gameResults.typingMetrics.accuracy}</li>
      <li>{gameResults.typingMetrics.incorrectCharacters}</li>
      <li>{gameResults.typingMetrics.correctCharacters}</li>
    </ul> */
}
