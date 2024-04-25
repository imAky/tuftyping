import { MainSpinner } from "./ui/component/Spinner";

export default function Loading() {
  return (
    <div className="flex flex-grow items-center justify-center">
      <MainSpinner className="absolute inset-0 flex items-center justify-center" />
    </div>
  );
}
