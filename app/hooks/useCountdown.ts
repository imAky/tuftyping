import { useCallback, useEffect, useRef, useState } from "react";

const useCountdown = (seconds: number) => {
  const [timeLeft, setTimeLeft] = useState<number>(seconds);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasTimerEnd = timeLeft <= 0;
  const isRunning = intervalRef.current != null;

  const startCountdown = useCallback(() => {
    if (!hasTimerEnd && !isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    }
  }, [setTimeLeft, hasTimerEnd, isRunning]);

  const resetCountdown = useCallback(() => {
    console.log("resetcountdown");
    clearInterval(intervalRef.current!);
    intervalRef.current = null;
    setTimeLeft(seconds);
  }, [seconds]);

  useEffect(() => {
    resetCountdown();
  }, [seconds]);

  // when the countdown reaches 0, clear the countdown interval
  useEffect(() => {
    if (hasTimerEnd) {
      clearInterval(intervalRef.current!);
      intervalRef.current = null;
    }
  }, [hasTimerEnd]);

  // clear interval when component unmounts
  useEffect(() => {
    return () => clearInterval(intervalRef.current!);
  }, []);

  return { timeLeft, startCountdown, resetCountdown };
};

export default useCountdown;
