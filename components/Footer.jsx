import React from "react";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";

function Footer() {
  return (
    <div className="flex flex-col text-center justify-center items-center font-bold py-8 px-2  text-[#324d67] space-y-4">
      <p>2022 DF All Rights Reserved</p>
      <p className="flex gap-4">
        <AiFillInstagram />
        <AiOutlineTwitter />
      </p>
    </div>
  );
}

export default Footer;
