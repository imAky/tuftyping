export const isKeyboardCodeAllowed = (code: string) => {
  const result =
    code.startsWith("Key") ||
    code.startsWith("Digit") ||
    code === "Backspace" ||
    code === "Space";
  return result;
};

export const countErrors = (actual: string, expected: string) => {
  const expectedCharacters = expected.split("");
  return expectedCharacters.reduce((errors, expectedChar, i) => {
    const actualChar = actual[i];
    if (actualChar !== expectedChar) {
      errors++;
    }
    return errors;
  }, 0);
};

export const formattedScore = (score: number) => {
  return parseFloat(score.toFixed(2));
};

export const isMobile = () => {
  if (typeof window !== "undefined") {
    const userAgent = navigator.userAgent;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    );
  }
  return false;
};

export const formatTime = (timeLeft: number): string => {
  if (timeLeft >= 3600) {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  } else if (timeLeft >= 60) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  } else {
    return timeLeft.toString();
  }
};

export const requiredPointsMap: { [key: string]: number } = {
  "50": 5000,
  "100": 10000,
  "200": 15000,
  "500": 25000,
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear() % 100;
  return `${day}/${month}/${year}`;
};
