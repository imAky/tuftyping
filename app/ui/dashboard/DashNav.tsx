import UserProfile from "./UserProfile";
import { formatTime } from "@/app/utils/helpers";

export default function DashNav({
  image,
  name,
  username,
  email,
  totalMatches,
  totalDuration,
  registrationDate,
}: //
{
  image?: string;
  name: string;
  username: string;
  email?: string;
  totalMatches: number | undefined;
  totalDuration: number | undefined;
  registrationDate: string | undefined;
}) {
  return (
    <div className="flex flex-col sm:flex-row justify-between  flex-wrap items-start sm:items-center my-8 bg-gradient-to-r from-blue-800 to-indigo-900 rounded-md">
      <div className="p-4 ">
        <UserProfile image={image} name={name} username={username} />
      </div>
      {/* <div className="flex flex-grow flex-wrap p-4 justify-around "> */}
      {email && (
        <div className="flex flex-col space-y-1 p-4">
          <h1 className="text-md tracking-wider font-bold text-cyan-500">
            Email
          </h1>
          <span className="sm:text-xl text-lg text-slate-200 font-semibold tracking-wider">
            {email}
          </span>
        </div>
      )}
      <div className="flex flex-col space-y-1 p-4">
        <h1 className="text-md tracking-wider font-bold text-cyan-500">
          Joined
        </h1>
        <span className="sm:text-xl text-lg text-slate-200 font-semibold tracking-wider">
          {registrationDate}
        </span>
      </div>
      <div className="flex flex-col space-y-1 p-4 ">
        <h1 className="text-md tracking-wider font-bold text-cyan-500">
          total duration
        </h1>
        {totalDuration && (
          <span className="sm:text-xl text-lg text-slate-200 font-semibold tracking-wider">
            {formatTime(totalDuration)}
          </span>
        )}
      </div>
    </div>
    // </div>
  );
}
