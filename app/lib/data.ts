"use server";

export const RequiredPoints = (prize: string) => {
  const requiredPointsMap: { [key: string]: number } = {
    "50": 10000,
    "100": 20000,
    "250": 30000,
    "500": 50000,
  };

  const requiredPoints = requiredPointsMap[prize];

  return requiredPoints;
};
