import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

interface UserProfileProps {
  image: string | undefined;
  name: string | undefined;
  username: string | undefined;
}

export default function UserProfile({
  image,
  name,
  username,
}: UserProfileProps) {
  return (
    <div className="flex items-center gap-4">
      {image ? (
        <Image
          src={image}
          width={128}
          height={128}
          alt={`${name} image`}
          className="rounded-full"
        />
      ) : (
        <FaUserCircle className="h-32 w-32" />
      )}
      <div>
        <h1 className="text-2xl font-bold text-slate-100 tracking-wide">
          {name}
        </h1>
        <h4>{username}</h4>
      </div>
    </div>
  );
}
