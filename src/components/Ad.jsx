import React from "react";
import { Link } from "react-router-dom";
import Apple from "../assests/appleLogo.png";
import Google from "../assests/googleLogo.webp";
import Microsoft from "../assests/microsoftLogo.png";
const Ad = () => {
  return (
    <div className="h-40 w-full bg-[#2c2b2b] py-10 rounded-lg ">
      <div className="flex lg:pl-20 h-full w-full justify-between items-center">
        <div className="text-2xl px-3 ">
          <div className="py-2"> SKXYWTF</div>
          <button className="bg-orange-500 py-1 text-black glow-button border p-1 rounded-lg">
            Signup
          </button>
        </div>
        <div className="flex justify-center  items-ceneter w-full gap-5 overflow-x-hidden">
          <Link to="/stock" className="h-24 w-24 lg:h-32 lg:w-36  bg-teal-200">
            <img src={Apple} className="h-full w-full " alt="apple" />
          </Link>
          <Link to="/stock" className="h-24 w-24 lg:h-32 lg:w-36 bg-teal-200">
            <img src={Google} className="h-full w-full" alt="google" />
          </Link>
          <Link to="/stock" className="h-24 w-24 lg:h-32 lg:w-36 bg-teal-200">
            <img src={Microsoft} className="h-full w-full" alt="microsoft" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Ad;
