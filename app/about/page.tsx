import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Welcome to TypingBattle – your ultimate destination for improving typing speed and earning rewards and cash prize.",
};

export default function Page() {
  return (
    <div className="flex min-h-screen flex-grow justify-between overflow-y-hidden">
      <div className="hidden md:flex flex-col   items-center   xl:w-[200px]  lg:w-1/5 md:w-1/4  ">
        <div className=""></div>
      </div>
      <div className="flex flex-col flex-grow mx-4 my-8 gap-y-8 max-w-5xl text-slate-50/50 privacy-policy">
        <h1 className="text-yellow-400 font-extrabold text-3xl tracking-wider ">
          About
        </h1>
        <p className="text-zinc-300 leading-7 font-medium tracking-wider text-md">
          Welcome to TypingBattle – your ultimate destination for improving
          typing speed and earning rewards and cash prize! Dive into exciting
          typing challenges, track your progress with detailed metrics like WPM,
          accuracy, raw WPM, correct/incorrect characters, and CPM. Earn points
          and redeem them for exciting rewards.
        </p>
        <h3 className="text-yellow-400 font-medium tracking-wider text-lg leading-7">
          stats:
        </h3>

        <p className="text-zinc-300 leading-7 font-medium tracking-wider text-md">
          <span className="text-gray-300 font-bold tracking-wider text-lg leading-7 mr-2">
            wpm:
          </span>
          total number of characters in the correctly typed words divided by 5
          and normalised to 60 seconds.
        </p>
        <p className="text-zinc-300 leading-7 font-medium tracking-wider text-md">
          <span className="text-gray-300 font-bold tracking-wider text-lg leading-7 mr-2">
            acc:
          </span>
          percentage of correctly pressed keys (correctly pressed keys / total
          key pressed).
        </p>
        <p className="text-zinc-300 leading-7 font-medium tracking-wider text-md">
          <span className="text-gray-300 font-bold tracking-wider text-lg leading-7 mr-2">
            points:
          </span>
          double of time duration in minutes (0 for 15s duration).
        </p>
        <p className="text-zinc-300 leading-7 font-medium tracking-wider text-md">
          <span className="text-gray-300 font-bold tracking-wider text-lg leading-7 mr-2">
            raw wpm:
          </span>
          calculated just like wpm, but also includes incorrect words.
        </p>

        <p className="text-zinc-300 leading-7 font-medium tracking-wider text-md">
          <span className="text-gray-300 font-bold tracking-wider text-lg leading-7 mr-2">
            cpm:
          </span>
          total number of characters in typed text normalised to 60 seconds.
        </p>
        <p className="text-zinc-300 leading-7 font-medium tracking-wider text-md">
          <span className="text-gray-300 font-bold tracking-wider text-lg leading-7 mr-2">
            char:
          </span>
          correct characters / incorrect characters after modification.
        </p>
        <p className="text-zinc-300 leading-7 font-medium tracking-wider text-md">
          <span className="text-gray-300 font-bold tracking-wider text-lg leading-7 mr-2">
            words:
          </span>
          total number of correctly typed words.
        </p>
        <p className="text-zinc-300 leading-7 font-medium tracking-wider text-md">
          <span className="text-gray-300 font-bold tracking-wider text-lg leading-7 mr-2">
            incorrect:
          </span>
          total number of incorrectly typed words.
        </p>

        <h1 className="text-yellow-400 font-medium tracking-wider text-lg leading-7">
          Points Rules:
        </h1>
        <ul className="list-disc mx-4">
          <li className="text-zinc-300 leading-7 font-medium tracking-wider text-md mb-4">
            Points are equal to double the typing time duration in minutes. For
            example, for 30 seconds, you earn 1 point, and for 1 minute, you
            earn 2 points, and so on.
          </li>
          <li className="text-zinc-300 leading-7 font-medium tracking-wider text-md mb-4">
            There are no points awarded for typing sessions lasting 15 seconds.
          </li>
          <li className="text-zinc-300 leading-7 font-medium tracking-wider text-md mb-4">
            Your wpm and accuracy must be greater than or equal to 25 and 75%,
            respectively, to earn points; otherwise, you receive zero points.
          </li>
        </ul>

        <h1 className="text-yellow-400 font-medium tracking-wider text-lg leading-7">
          Result Screen:
        </h1>

        <p className="text-zinc-300 leading-7 font-medium tracking-wider text-md mb-4">
          After completing a test, you will be able to see your wpm, accuracy,
          points, raw wpmM, cpm, character stats, correct words, incorrect
          words, and time duration. (You can hover over values to get more
          details.)
        </p>

        <h1 className="text-yellow-400 font-medium tracking-wider text-lg leading-7">
          Redemption Rule:
        </h1>

        <p className="text-zinc-300 leading-7 font-medium tracking-wider text-md mb-4">
          Your account must be older than 15 days to process redemption.
        </p>

        <h1 className="text-yellow-400 font-medium tracking-wider text-lg leading-7">
          Contact:
        </h1>

        <p className="text-zinc-300 leading-7 font-medium tracking-wider text-md mb-4">
          If you encounter a bug, or have a feature request or just want to
          contact me for any queries then click{" "}
          <Link
            target="_blank"
            href="mailto:typingbattle@gmail.com"
            className="underline underline-offset-4 decoration-solid decoration-slate-100 text-slate-300 hover:text-slate-100"
          >
            here
          </Link>
          .
        </p>
      </div>

      <div className="hidden md:flex flex-col  items-center   xl:w-[200px]  lg:w-1/5 md:w-1/4 ">
        <div className=""></div>
      </div>
    </div>
  );
}
