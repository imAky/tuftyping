import Image from "next/image";
import React, { useEffect, useState } from "react";
import NavList from "./NavList";
interface User {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  username?: string | null | undefined;
}

interface ProfileProps {
  user: User | undefined;
  pathname: string;
}

const Profile = ({ user, pathname }: ProfileProps) => {
  const [navlist, showNavList] = useState(false);
  const hanldeClick = (e: any) => {
    e.preventDefault();
    showNavList(!navlist);
  };

  useEffect(() => {
    showNavList(false);
  }, [pathname]);

  return (
    <div className="">
      <button className="relative" onClick={hanldeClick}>
        {user?.image && (
          <Image
            src={user.image}
            alt="Profile"
            width={32}
            height={32}
            className="rounded-full"
          />
        )}
        {!user?.image && user?.name && (
          <span className="bg-sky-600 text-gray-900 p-2 rounded-full w-32 h-32">
            {user.name[0]}
          </span>
        )}
      </button>
      {user?.username && user?.name && navlist && (
        <NavList name={user?.name} username={user?.username} />
      )}
    </div>
  );
};

export default Profile;
