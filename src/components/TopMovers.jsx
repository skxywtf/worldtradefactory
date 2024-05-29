import React from "react";
import { FaGoogle } from "react-icons/fa";
import { AiOutlineRise } from "react-icons/ai";
import { IoMdTrendingDown } from "react-icons/io";
import { FaMeta } from "react-icons/fa6";
const TopMovers = () => {
  return (
    <div className="w-full h-auto py-10">
      <h1 className="text-3xl pl-5 "> THE DAY'S DYNAMO: TOP MOVERS</h1>
      <div className="flex gap-5 w-full h-[80%] py-10 px-5 ">
        <div className="bg-[#2c2b2b] h-full w-1/2 rounded-lg py-3 lg:px-20">
          <h1 className="pl-5 text-xl">Gainers</h1>
          <div className="flex flex-row justify-between px-4 h-full w-full">
            <div className="h-full w-full gap-5">
              <div className="flex items-center gap-2 py-3">
                <FaGoogle />
                <h1>GOOG</h1>
              </div>
              <div className="flex items-center gap-2 py-3">
                <FaGoogle />
                <h1>GOOG</h1>
              </div>
              <div className="flex items-center gap-2 py-3">
                <FaGoogle />
                <h1>GOOG</h1>
              </div>
              <div className="flex items-center gap-2 py-3">
                <FaGoogle />
                <h1>GOOG</h1>
              </div>
              <div className="flex items-center gap-2 py-3">
                <FaGoogle />
                <h1>GOOG</h1>
              </div>
            </div>
            {/*  */}
            <div>
              <div className="flex items-center gap-2 py-3 text-green-500">
                <AiOutlineRise />
                <h1>123.32%</h1>
              </div>
              <div className="flex items-center gap-2 py-3 text-green-500">
                <AiOutlineRise />
                <h1>123.32%</h1>
              </div>
              <div className="flex items-center gap-2 py-3 text-green-500">
                <AiOutlineRise />
                <h1>123.32%</h1>
              </div>
              <div className="flex items-center gap-2 py-3 text-green-500">
                <AiOutlineRise />
                <h1>123.32%</h1>
              </div>
              <div className="flex items-center gap-2 py-3 text-green-500">
                <AiOutlineRise />
                <h1>123.32%</h1>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="bg-[#2c2b2b] py-3 h-full w-1/2 rounded-lg  lg:px-20">
          <h1 className="pl-5 text-xl">Losers</h1>
          <div className="flex flex-row justify-between px-4 h-full w-full">
            <div className="h-full w-full gap-5">
              <div className="flex items-center gap-2 py-3">
                <FaMeta />
                <h1>META</h1>
              </div>
              <div className="flex items-center gap-2 py-3">
                <FaMeta />
                <h1>META</h1>
              </div>
              <div className="flex items-center gap-2 py-3">
                <FaMeta />
                <h1>META</h1>
              </div>
              <div className="flex items-center gap-2 py-3">
                <FaMeta />
                <h1>META</h1>
              </div>
              <div className="flex items-center gap-2 py-3">
                <FaMeta />
                <h1>META</h1>
              </div>
            </div>
            {/*  */}
            <div>
              <div className="flex items-center gap-2 py-3 text-red-500">
                <IoMdTrendingDown />
                <h1>123.32%</h1>
              </div>
              <div className="flex items-center gap-2 py-3 text-red-500">
                <IoMdTrendingDown />
                <h1>123.32%</h1>
              </div>
              <div className="flex items-center gap-2 py-3 text-red-500">
                <IoMdTrendingDown />
                <h1>123.32%</h1>
              </div>
              <div className="flex items-center gap-2 py-3 text-red-500">
                <IoMdTrendingDown />
                <h1>123.32%</h1>
              </div>
              <div className="flex items-center gap-2 py-3 text-red-500">
                <IoMdTrendingDown />
                <h1>123.32%</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopMovers;
