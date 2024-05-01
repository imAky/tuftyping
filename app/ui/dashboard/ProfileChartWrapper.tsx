import { fetchUserScoreByUsername } from "@/app/lib/action";
import LineChart from "./LineChart";

export default async function ProfileChartWrapper({
  username,
}: {
  username: string;
}) {
  const userScore = await fetchUserScoreByUsername(username);

  const labels = userScore?.map((score) =>
    new Date(score.date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    })
  );
  const wpmData = userScore?.map((score) => score.wpm);
  const rawWpmData = userScore?.map((score) => score.rawWpm);
  const pointsData = userScore?.map((score) => score.points);
  const timeOfTypingTest = userScore?.map((score) => score.timeOfTypingTest);
  return (
    <>
      <div className="mb-16 block ">
        <LineChart
          labels={labels}
          datasets={[
            { label: "Wpm", data: wpmData, color: "#36a2eb", timeOfTypingTest },
            {
              label: "Raw Wpm",
              data: rawWpmData,
              color: "#ff6384",
              timeOfTypingTest,
            },
            {
              label: "Points",
              data: pointsData,
              color: "#ffce56",
              timeOfTypingTest,
            },
          ]}
        />
      </div>
    </>
  );
}
