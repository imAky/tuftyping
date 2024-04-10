import LineChart from "./LineChart";

export default async function ChartWrapper() {
  //await new Promise((resolve) => setTimeout(resolve, 7000));
  const labels = [
    "23/02/24",
    "24/02/24",
    "25/02/24",
    "26/02/24",
    "27/02/24",
    "28/02/24",
    "29/02/24",
    "31/02/24",
  ];
  const data = [30, 25, 100, 150, 22, 50, 17.3, 20.5]; // Your data
  return (
    <>
      <div className="mb-16 block">
        <div className="flex items-center justify-center">
          <span className="">Last 7 Wpm</span>
        </div>
        <LineChart labels={labels} data={data} />
      </div>
    </>
  );
}
