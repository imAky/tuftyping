import Image from "next/image";

export function ReImage({
  width = 198,
  height = 128,
  className = "",
}: {
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <div
      className={`bg-slate-300  inline-block p-16 rounded-lg ${
        className && className
      }`}
    >
      <Image
        src="/img/paypal.svg"
        alt="paypal-logo"
        width={width}
        height={height}
      />
    </div>
  );
}

export function ReProgress({
  progressPercentage,
}: {
  progressPercentage: number;
}) {
  return (
    <div className="w-11/12 my-4  bg-gray-200  rounded-full overflow-hidden">
      <div
        className="bg-green-500 h-3 rounded-full"
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
  );
}
