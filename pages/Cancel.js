import React from "react";
import { useRouter } from "next/router";

export default function Cancel() {
  const router = useRouter();
  return (
    <>
      <div className="max-w-6xl mx-auto">
        <div
          onClick={() => router.push("/")}
          className="flex flex-row items-ceconst router = useRouter();nter gap-[3px] cursor-pointer text-[#8F0D34] hover:text-[#530319]"
        >
          <div className="overflow-hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
          </div>
          <p className="text-lg font-semibold">Go back</p>
        </div>
        <div className="flex justify-center items-center text-2xl font-bold bg-red-200 text-red-500 p-28 rounded-sm">
          Payment did not go through
        </div>
      </div>
    </>
  );
}