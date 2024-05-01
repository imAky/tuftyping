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
    clearInterval(intervalRef.current!);
    intervalRef.current = null;
    setTimeLeft(seconds);
  }, [seconds]);

  useEffect(() => {
    resetCountdown();
  }, [seconds]);

  useEffect(() => {
    if (hasTimerEnd) {
      clearInterval(intervalRef.current!);
      intervalRef.current = null;
    }
  }, [hasTimerEnd]);

  useEffect(() => {
    return () => clearInterval(intervalRef.current!);
  }, []);

  return { timeLeft, startCountdown, resetCountdown };
};

export default useCountdown;
