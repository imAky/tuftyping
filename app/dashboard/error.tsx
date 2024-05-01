"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex h-full flex-col items-center justify-center my-8">
      <h2 className="text-center text-red-300">Something went wrong!</h2>
      <button
        className="mt-4 rounded-md bg-red-700 px-4 py-2 text-sm text-white transition-colors hover:bg-red-500"
        onClick={() => reset()}
      >
        Try again
      </button>
    </main>
  );
}
