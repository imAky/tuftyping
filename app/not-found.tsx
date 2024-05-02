import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { FaRegFaceFrown } from "react-icons/fa6";

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-4 py-32">
      <FaRegFaceFrown className="w-28 h-28 text-red-400 animate-bounce " />
      <h2 className="text-7xl font-semibold text-yellow-500">404</h2>
      <p className="text-slate-300">
        Ooops! Looks like this page or resource doesn't exist.
      </p>
      <Link
        href="/"
        className="mt-4 flex items-center justify-center gap-2 rounded-md bg-gray-800 px-6 py-4 text-lg tracking-wider text-white transition-colors hover:bg-gray-700"
      >
        <FaHome /> Go Home
      </Link>
    </main>
  );
}
