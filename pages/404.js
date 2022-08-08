import React, { useEffect } from "react";
import { useRouter } from "next/router";

export default function FourZeroFour() {
  const router = useRouter();
  //Okay
  // useEffect(() => {
  //   setTimeout(() => {
  //     window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}`;
  //   }, 2000);
  // }, []);

  return (
    <>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center items-center text-2xl font-bold bg-red-200 text-red-500 p-28 rounded-sm">
          LOOKS LIKE YOU ARE LOST. REDIRECTING YOU TO THE HOME PAGE!
        </div>
      </div>
    </>
  );
}
