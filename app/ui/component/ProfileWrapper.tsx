import { useSession } from "next-auth/react";
import Profile from "./Profile";
import SignInButton from "./SignInButton";
import { Spinner } from "./Spinner";

export default function ProfileWrapper({ pathname }: { pathname: string }) {
  const { data: session, status } = useSession();

  return (
    <div>
      {status === "loading" ? (
        <div className="relative">
          <Spinner />
        </div>
      ) : session ? (
        <div>
          <Profile user={session.user} pathname={pathname} />
        </div>
      ) : (
        <SignInButton />
      )}
    </div>
  );
}
