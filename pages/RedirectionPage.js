import React from "react";
import { useRouter } from "next/router";

export default function RedirectionPage() {
  const router = useRouter();
  return (
    <>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center items-center text-2xl font-bold bg-red-200 text-red-500 p-28 rounded-sm">
          REDIRECTING YOU TO THE HOME PAGE!
        </div>
      </div>
    </>
  );
}
