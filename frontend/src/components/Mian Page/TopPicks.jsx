import React from "react";
import Apple from "../../assets/appleLogo.png";
import Google from "../../assets/googleLogo.webp";
import Microsoft from "../../assets/microsoftLogo.png";
import Link from "next/link";

const TopPicks = () => {
  return (
    <div className="py-10">
      <h1 className="text-4xl pl-3 pb-10">Top Picks</h1>
      <div className="h-40 w-full  bg-gradient-to-r from-red-900  rounded-md">
        <div className="flex lg:pl-20 h-full w-full justify-between items-center">
          <div className="text-2xl px-3 py-2  ">
            <div> SKXYWTF</div>
            <button className="bg-orange-500 text-black glow-button border p-1 rounded-lg">
              Signup
            </button>
          </div>
          <div className="flex justify-center w-full gap-7 overflow-x-hidden">
            <Link
              href="/main/stock"
              className="h-24 w-24 lg:h-32 lg:w-36 bg-teal-200"
            >
              <img src={Apple} className="h-full w-full" alt="apple" />
            </Link>
            <Link
              href="/main/stock"
              className="h-24 w-24 lg:h-32 lg:w-36 bg-teal-200"
            >
              <img src={Google} className="h-full w-full" alt="google" />
            </Link>
            <Link
              href="/main/stock"
              className="h-24 w-24 lg:h-32 lg:w-36 bg-teal-200"
            >
              <img src={Microsoft} className="h-full w-full" alt="microsoft" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopPicks;
