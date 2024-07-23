"use client";
import { FaGoogle } from "react-icons/fa";
import { AiOutlineRise } from "react-icons/ai";
import { IoMdTrendingDown } from "react-icons/io";
import { FaMeta } from "react-icons/fa6";
const TopMovers = () => {
  return (
    <div className="w-full h-auto py-10">
      <h1 className="text-3xl pl-10 pb-10">
        {" "}
        THE DAY'S DYNAMO: TOP MOVERS{">"}
      </h1>
      <div className="lg:flex gap-5 w-full h-[80%] py-10 px-5 ">
        <div className="bg-opacity-50 dark:bg-gray-200 bg-[#192032] border border-gray-600 h-full lg:w-1/2 mb-10 lg:mb-1  rounded-lg py-3 lg:px-3">
          <h1 className="pl-5 font-bold text-xl">Gainers</h1>

          <div className="flex flex-row justify-between px-6 h-full w-full">
            <div className="h-full w-full gap-5">
              <div className="flex items-center gap-2 py-7">
                <FaGoogle />
                <h1>GOOG</h1>
              </div>
              <hr className=" dark:text-black text-gray-500" />
              <div className="flex items-center gap-2 py-7">
                <FaGoogle />
                <h1>GOOG</h1>
              </div>
              <hr />
              <div className="flex items-center gap-2 py-7">
                <FaGoogle />
                <h1>GOOG</h1>
              </div>
              <hr />
              <div className="flex items-center gap-2 py-7">
                <FaGoogle />
                <h1>GOOG</h1>
              </div>
              <hr />
              <div className="flex items-center gap-2 py-7">
                <FaGoogle />
                <h1>GOOG</h1>
              </div>
            </div>
            {/*  */}
            <div>
              <div className="flex items-center gap-2 py-7 text-green-500">
                <AiOutlineRise />
                <h1>123.32%</h1>
              </div>
              <hr />
              <div className="flex items-center gap-2 py-7 text-green-500">
                <AiOutlineRise />
                <h1>123.32%</h1>
              </div>
              <hr />
              <div className="flex items-center gap-2 py-7 text-green-500">
                <AiOutlineRise />
                <h1>123.32%</h1>
              </div>
              <hr />
              <div className="flex items-center gap-2 py-7 text-green-500">
                <AiOutlineRise />
                <h1>123.32%</h1>
              </div>
              <hr />
              <div className="flex items-center gap-2 py-7 text-green-500">
                <AiOutlineRise />
                <h1>123.32%</h1>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="bg-opacity-50 dark:bg-gray-200 bg-[#192032] py-3 h-full border border-gray-600 lg:w-1/2 rounded-lg  lg:px-6">
          <h1 className="pl-5 font-bold text-xl">Losers</h1>
          <div className="flex flex-row justify-between  px-4 h-full w-full">
            <div className="h-full w-full gap-5">
              <div className="flex items-center gap-2 py-7">
                <FaMeta />
                <h1>META</h1>
              </div>
              <hr />
              <div className="flex items-center gap-2 py-7">
                <FaMeta />
                <h1>META</h1>
              </div>
              <hr />
              <div className="flex items-center gap-2 py-7">
                <FaMeta />
                <h1>META</h1>
              </div>
              <hr />
              <div className="flex items-center gap-2 py-7">
                <FaMeta />
                <h1>META</h1>
              </div>
              <hr />
              <div className="flex items-center gap-2 py-7">
                <FaMeta />
                <h1>META</h1>
              </div>
            </div>
            {/*  */}
            <div>
              <div className="flex items-center gap-2 py-7 text-red-500">
                <IoMdTrendingDown />
                <h1>123.32%</h1>
              </div>
              <hr />
              <div className="flex items-center gap-2 py-7 text-red-500">
                <IoMdTrendingDown />
                <h1>123.32%</h1>
              </div>
              <hr />
              <div className="flex items-center gap-2 py-7 text-red-500">
                <IoMdTrendingDown />
                <h1>123.32%</h1>
              </div>
              <hr />
              <div className="flex items-center gap-2 py-7 text-red-500">
                <IoMdTrendingDown />
                <h1>123.32%</h1>
              </div>
              <hr />
              <div className="flex items-center gap-2 py-7 text-red-500">
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
