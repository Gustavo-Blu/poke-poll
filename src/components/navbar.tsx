import { useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex justify-between">
      <nav>
        <Link href={"/pokemon"}>All Pokemon</Link>
        <Link href={"/home"}>Home</Link>
      </nav>
      {sessionData ? (
        <div>Welcome, {sessionData.user?.name}</div>
      ) : (
        <div>please log in</div>
      )}
    </div>
  );
};

export default Navbar;
