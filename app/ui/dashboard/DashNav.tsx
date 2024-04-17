import UserProfile from "./UserProfile";
import { formatTime } from "@/app/utils/helpers";

export default function DashNav({
  session,
  totalMatches,
  totalDuration,
  registrationDate,
}: //
{
  session: any;
  totalMatches: number | undefined;
  totalDuration: number | undefined;
  registrationDate: string | undefined;
}) {
  return (
    <div className="flex flex-col sm:flex-row justify-between  flex-wrap items-start sm:items-center my-8 bg-[#2C2E31] rounded-md">
      <div className="p-4 ">
        <UserProfile
          image={session?.user?.image}
          name={session?.user?.name}
          username={session?.user?.username}
        />
      </div>
      {/* <div className="flex flex-grow flex-wrap p-4 justify-around "> */}
      <div className="flex flex-col space-y-1 p-4">
        <h1 className="text-md tracking-wide font-bold">email</h1>
        <span className="text-xl text-slate-100 font-bold tracking-wide">
          {session?.user?.email}
        </span>
      </div>
      <div className="flex flex-col space-y-1 p-4">
        <h1 className="text-md tracking-wide font-bold">Joined</h1>
        <span className="text-xl text-slate-100 font-bold tracking-wide">
          {registrationDate}
        </span>
      </div>
      <div className="flex flex-col space-y-1 p-4 ">
        <h1 className="text-md tracking-wide font-bold">total duration</h1>
        {totalDuration && (
          <span className="text-xl text-slate-100 font-bold tracking-wide">
            {formatTime(totalDuration)}
          </span>
        )}
      </div>
    </div>
    // </div>
  );
}
