import { MainSpinner, ProgressSpinner, Spinner } from "../ui/component/Spinner";

export default function About() {
  return (
    <div>
      <MainSpinner className="absolute inset-0 flex items-center justify-center" />
      <ProgressSpinner />
      <Spinner />
    </div>
  );
}
