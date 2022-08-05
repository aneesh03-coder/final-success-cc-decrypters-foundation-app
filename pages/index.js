import Head from "next/head";
import Image from "next/image";
import Feed from "../components/Feed";
import HeroBanner from "../components/HeroBanner";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col py-2s justify-centerd items-center">
      <div className="flex flex-col p-2  justify-center items-center px-8  w-full  space-y-2"> 
      <HeroBanner/>

      <Feed/>

      </div>
      
    </div>
  );
}
