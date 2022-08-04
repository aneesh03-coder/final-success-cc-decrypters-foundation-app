import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className="w-full h-[100vh] flex flex-col justify-evenly ">
      <div className="w-full text-center h-[70vh] flex flex-col justify-center items-center">
        <div className="text-6xl font-bold text-red-500 mb-4">
          Welcome to PAPA-FAM SUCCESS COACHING CALL🔥
        </div>

        <div className="text-4xl font-bold text-blue-500">
          Team Decrypters Welcomes You!
        </div>
      </div>
      <div className="flex flex-col  items-end mr-32 text-2xl text-center text-gray-600">
        <div className="mb-8">
          <div className="text-4xl font-bold text-gray-500 mb-4">
            Team Members
          </div>
          <div>William Gyeke</div>
          <div>Hadi Boukdir</div>
          <div>Marty Muhanga</div>
          <div>Akshay Agarwal</div>
          <div>Aneesh Kalra</div>
        </div>
      </div>
    </div>
  );
}
