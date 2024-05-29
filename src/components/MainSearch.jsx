import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const MainSearch = () => {
  return (
    <div className="h-screen w-full pt-20">
      <h1 className="w-full text-3xl lg:text-5xl py-24 lg:py-32 text-center flex flex-wrap justify-center items-center">
        Unlocking Intelligent Financial Mastery
      </h1>
      <div className="w-full h-10 flex justify-center">
        <form action="submit" className=" h-full items-center w-[60%]">
          <input
            type="text"
            placeholder="search stocks"
            className=" px-5 h-full items-center w-full border-2 border-teal-600 text-black rounded-md"
          />
        </form>
      </div>
      <br />
      <div className="flex justify-center gap-2 lg:gap-4 lg:text-xl">
        <div className="">popular stocks :</div>
        <Link className=" underline hover:text-blue-700" to="/stock">
          GOOG
        </Link>
        <Link className=" underline hover:text-blue-700" to="/stock">
          META
        </Link>
        <Link className=" underline hover:text-blue-700" to="/stock">
          MICR
        </Link>
        <Link className=" underline hover:text-blue-700" to="/stock">
          META
        </Link>
        <Link
          className="hidden lg:block underline hover:text-blue-700"
          to="/stock"
        >
          GOOG
        </Link>
        <Link
          className="hidden lg:block underline hover:text-blue-700"
          to="/stock"
        >
          MICR
        </Link>
      </div>
    </div>
  );
};

export default MainSearch;
