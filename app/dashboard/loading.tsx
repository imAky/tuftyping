import { MainSpinner } from "../ui/component/Spinner";

export default function Loading() {
  return (
    <div className="flex flex-grow items-center justify-center">
      <MainSpinner className="my-4" />
    </div>
  );
}
