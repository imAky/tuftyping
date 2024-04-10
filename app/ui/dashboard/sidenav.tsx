import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

interface User {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}

interface SideNavProps {
  user: User | undefined;
}

export default function SideNav({ user }: SideNavProps) {
  return (
    <div className="flex flex-col items-center  min-h-full w-64 bg-[#33394be8] py-4 drop-shadow-2xl">
      <div>
        {user?.image ? (
          <Image
            src={user.image}
            alt="Profile"
            width={96}
            height={96}
            className="rounded-full"
          />
        ) : (
          <FaUserCircle className="h-24 w-24" />
        )}
      </div>
      <div className="flex flex-col items-center space-y-2 text-slate-200 ">
        {user?.name && <span className="mt-4 text-left">{user.name}</span>}
        {user?.email && <span className="text-sm text-left">{user.email}</span>}
      </div>
    </div>
  );
}
