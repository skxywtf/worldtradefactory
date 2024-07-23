"use client";
import React from "react";
import Logo from "../../../assets/skxywtfLogo.jpeg";
import Image from "next/image";
const HeaderLand = () => {
  return (
    <div className=" border-b border-white w-full h-16">
      <div className=" h-full flex items-center justify-between px-10 w-full">
        {/* logo */}
        <div className="  w-28 ">
          <Image
            className=" cursor-pointer py-4 h-full w-full"
            src={Logo}
            alt=""
          />
        </div>
        {/* middle parameters */}
        <div className=" hidden md:flex gap-7">
          <button className=" p-1 px-3 text-lg hover:bg-neutral-800 rounded-full">
            Stocks
          </button>
          <button className=" p-1 px-3 text-lg hover:bg-neutral-800 rounded-full">
            Bonds
          </button>
          <button className=" p-1 px-3 text-lg hover:bg-neutral-800 rounded-full">
            Forex
          </button>
          <button className=" p-1 px-3 text-lg hover:bg-neutral-800 rounded-full">
            Crypto
          </button>
          <button className=" p-1 px-3 text-lg hover:bg-neutral-800 rounded-full">
            About Us
          </button>
        </div>
        {/* search bar */}
        <div className="">
          <form>
            <input
              className=" h-8 bg-neutral-800 focus:outline-none focus:border-transparent  rounded-full px-3"
              type="text"
              placeholder="Search"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default HeaderLand;
