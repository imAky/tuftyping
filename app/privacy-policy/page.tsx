import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "At TypingBattle, Privacy Policy outlines how we collect, use, and safeguard your personal information when you use our website.",
};
export default function Page() {
  return (
    <div className="flex min-h-screen flex-grow justify-between overflow-y-hidden">
      <div className="hidden md:flex flex-col   items-center   xl:w-[200px]  lg:w-1/5 md:w-1/4  ">
        <div className=""></div>
      </div>
      <div className="flex flex-col flex-grow mx-4 my-8 gap-y-8 max-w-5xl text-slate-50/50 privacy-policy">
        <h1 className="text-yellow-400 font-extrabold text-3xl tracking-wider ">
          Privacy Policy
        </h1>

        <p className="text-zinc-300 leading-7 font-medium tracking-wider text-md">
          Welcome to TypingBattle! At TypingBattle, we are committed to
          protecting your privacy. This Privacy Policy outlines how we collect,
          use, and safeguard your personal information when you use our website
          and services.
        </p>
        <h3 className="text-yellow-400 font-medium tracking-wider text-lg leading-7">
          Information We Collect:
        </h3>

        <p className="text-zinc-300 leading-7 font-medium tracking-wider text-md">
          <span className="text-gray-300 font-bold tracking-wider text-lg leading-7 mr-2">
            Personal Information:
          </span>
          When you sign up for TypingBattle, we collect your name, email, and
          profile picture if you choose to sign in via Google account.
        </p>
        <p className="text-zinc-300 leading-7 font-medium tracking-wider text-md">
          <span className="text-gray-300 font-bold tracking-wider text-lg leading-7 mr-2">
            Game Data:
          </span>
          We collect data related to your typing speed game performance,
          including your typing speed, accuracy, and points earned during
          gameplay.
        </p>
        <p className="text-zinc-300 leading-7 font-medium tracking-wider text-md">
          <span className="text-gray-300 font-bold tracking-wider text-lg leading-7 mr-2">
            Redemption Information:
          </span>
          If you choose to redeem cash via PayPal, we use your account email
          address for PayPal processing payments.Please ensure that your email
          is registered with PayPal for cash redemption purposes.
        </p>
        <p className="text-zinc-300 leading-7 font-medium tracking-wider text-md">
          <span className="text-gray-300 font-bold tracking-wider text-lg leading-7 mr-2">
            Communication:
          </span>
          We may collect information from your communications with us, including
          feedback, support requests, and any other interactions.
        </p>

        <h1 className="text-yellow-400 font-medium tracking-wider text-lg leading-7">
          How We Use Your Information:
        </h1>

        <p className="text-zinc-300 leading-7 font-medium tracking-wider text-md">
          <span className="text-gray-300 font-bold tracking-wider text-lg leading-7 mr-2">
            Improving Services:{" "}
          </span>
          We use your game data to improve our typing speed game and enhance
          your gaming experience.
        </p>
        <p className="text-zinc-300 leading-7 font-medium tracking-wider text-md">
          <span className="text-gray-300 font-bold tracking-wider text-lg leading-7 mr-2">
            Communication:{" "}
          </span>
          We may use your email address to send you important updates,
          notifications, related to TypingBattle.
        </p>
        <p className="text-zinc-300 leading-7 font-medium tracking-wider text-md">
          <span className="text-gray-300 font-bold tracking-wider text-lg leading-7 mr-2">
            Cash Redemption:
          </span>
          Your PayPal email address is used for processing cash redemption
          requests.
        </p>

        <h1 className="text-yellow-400 font-medium tracking-wider text-lg leading-7">
          Data Security:
        </h1>
        <p className="text-zinc-300 leading-7 font-medium tracking-wider text-md">
          We implement industry-standard security measures to protect your
          personal information from unauthorized access, alteration, disclosure,
          or destruction.
        </p>
        <h1 className="text-yellow-400 font-medium tracking-wider text-lg leading-7">
          Privacy Policy Modifications:
        </h1>
        <p className="text-zinc-300 leading-7 font-medium tracking-wider text-md">
          We reserve the right to modify or update these Privacy Policy at any
          time. Continued use of TypingBattle after any changes constitutes your
          acceptance of the revised Privacy.
        </p>
      </div>

      <div className="hidden md:flex flex-col  items-center   xl:w-[200px]  lg:w-1/5 md:w-1/4 ">
        <div className=""></div>
      </div>
    </div>
  );
}
