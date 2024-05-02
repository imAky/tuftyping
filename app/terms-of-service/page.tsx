import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Welcome to TypingBattle! These Terms of Service govern your use of our  website. By accessing or using TypingBattle, you agree to be bound by these terms.",
};

export default function Page() {
  return (
    <div className="flex min-h-screen flex-grow justify-between overflow-y-hidden">
      <div className="hidden md:flex flex-col   items-center   xl:w-[200px]  lg:w-1/5 md:w-1/4  ">
        <div className=""></div>
      </div>
      <div className="flex flex-col flex-grow mx-4 my-8 gap-y-8 max-w-5xl text-slate-50/50 privacy-policy">
        <h1 className="text-yellow-400 font-extrabold text-3xl tracking-wider ">
          Terms of Service
        </h1>
       

        <h3 className="text-yellow-400 font-medium tracking-wider text-lg leading-7">
          Agreement
        </h3>
        <p className="text-zinc-300 leading-7 font-medium tracking-wider text-md">
          Welcome to TypingBattle! These Terms of Service govern your use of our
          website. By accessing or using TypingBattle, you agree to be bound by
          these terms.
        </p>

        <h3 className="text-yellow-400 font-medium tracking-wider text-lg leading-7">
          Limitations
        </h3>

        <p className="text-zinc-300 leading-7 font-medium tracking-wider text-md">
          <span className="text-gray-300 font-bold tracking-wider text-lg leading-7 mr-2">
            Account:
          </span>
          You are responsible for maintaining the confidentiality of your
          account credentials.
        </p>
        <p className="text-zinc-300 leading-7 font-medium tracking-wider text-md">
          <span className="text-gray-300 font-bold tracking-wider text-lg leading-7 mr-2">
            User Conduct:
          </span>
          You agree to refrain from engaging in any conduct that violates these
          Terms of Service.
        </p>
        <p className="text-zinc-300 leading-7 font-medium tracking-wider text-md">
          <span className="text-gray-300 font-bold tracking-wider text-lg leading-7 mr-2">
            Cash Redemption:
          </span>
          Cash redemption requests may take up to 48 Hours to process.We reserve
          the right to deny cash redemption if fraudulent activity or unfair
          gaming practices are detected.
        </p>

        <h1 className="text-yellow-400 font-medium tracking-wider text-lg leading-7">
          Disclaimers:
        </h1>

        <p className="text-zinc-300 leading-7 font-medium tracking-wider text-md">
          <span className="text-gray-300 font-bold tracking-wider text-lg leading-7 mr-2">
            Fair Play:
          </span>
          You agree to play the typing speed game fairly and refrain from using
          any unfair means or cheating tactics.
        </p>
        <p className="text-zinc-300 leading-7 font-medium tracking-wider text-md">
          <span className="text-gray-300 font-bold tracking-wider text-lg leading-7 mr-2">
            Intellectual Property:{" "}
          </span>
          All content and materials on TypingBattle, including but not limited
          to text, graphics, logos, images are the property of TypingBattle and
          are protected by copyright.
        </p>
        <p className="text-zinc-300 leading-7 font-medium tracking-wider text-md">
          <span className="text-gray-300 font-bold tracking-wider text-lg leading-7 mr-2">
            Third-Party Links:
          </span>
          TypingBattle may contain links to third-party websites or services
          that are not owned or controlled by us. We are not responsible for the
          content or practices of any third-party websites or services and
          encourage you to review their terms of service and privacy policies.
        </p>

        <h1 className="text-yellow-400 font-medium tracking-wider text-lg leading-7">
          Termination:
        </h1>
        <p className="text-zinc-300 leading-7 font-medium tracking-wider text-md">
          We reserve the right to terminate or suspend your account without
          prior notice if you violate these Terms of Service.
        </p>
        <h1 className="text-yellow-400 font-medium tracking-wider text-lg leading-7">
          Terms Modifications
        </h1>
        <p className="text-zinc-300 leading-7 font-medium tracking-wider text-md">
          We reserve the right to modify or update these Terms of Service at any
          time. Continued use of TypingBattle after any changes constitutes your
          acceptance of the revised terms.
        </p>
      </div>

      <div className="hidden md:flex flex-col  items-center   xl:w-[200px]  lg:w-1/5 md:w-1/4 ">
        <div className=""></div>
      </div>
    </div>
  );
}
