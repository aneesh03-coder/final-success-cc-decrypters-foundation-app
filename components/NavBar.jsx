import React from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

function NavBar() {
  const { data: session } = useSession();
  const router = useRouter();

  // const session = 'william'
  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex w-full justify-between my-2 mx-8 md:max-w-[80%]">
        <div
          className="h-8 w-8 p-6 border-2 border-blue-500 bg-red-800 rounded-full justify-center items-center flex cursor-pointer 
            transition-all duration-150 ease-out hover:scale-75"
        >
          <p className="text-gray-100 text-lg" onClick={() => router.push("/")}>
            DF
          </p>
        </div>

        <div className="flex justify-center items-center text-gray-500 cursor-pointer border-none bg-transparent space-x-4">
          {session && (
            <p>
              <small>welcome </small>
              {session?.user?.name}
            </p>
          )}

          <div className="rounded-lg hover:bg-gray-200 p-2 transition-all duration-200">
            {!session ? (
              <p onClick={() => signIn("google")}>SignIn</p>
            ) : (
              <p onClick={signOut}>SignOut</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
