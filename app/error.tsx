"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex h-full flex-col items-center justify-center absolute inset-0">
      <div
        className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
        role="alert"
      >
        <span className="font-medium">Error: </span> {error.message}
      </div>
      <button
        className="mt-4 rounded-md bg-red-500 px-4 py-2 text-sm text-white transition-colors hover:bg-red-500"
        onClick={() => reset()}
      >
        Try again
      </button>
    </main>
  );
}
