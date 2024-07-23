"use client";

import React from "react";
import { BiSolidUpArrow } from "react-icons/bi";
import { FaShareAlt } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import Google from "../../assets/googleLogo.webp";
import BestPerform from "../Mian Page/BestPerform";
import IndexETF from "../Mian Page/IndexETF";
import Navbar from "../header and Footer/Navbar";
import Footer from "../header and Footer/Footer";
import CompanyProfile from "../embeded codes/other widgets/CompanyProfile";

// Define the type for the component's props (none in this case)
const Stock: React.FC = () => {
  return (
    <div className="dark:bg-gray-200 dark:text-black">
      <Navbar />
      <div className="pt-40 h-full w-full">
        <div className="flex w-full justify-between px-10">
          {/* left */}
          <div className="w-1/2 justify-center">
            <div className="flex items-center">
              <img
                src={Google.src} // TypeScript needs .src for StaticImageData
                alt="Google Logo"
                className="h-10 w-14 rounded-md"
              />
              <div className="mx-5">
                <button className="border rounded-lg p-1 bg-gray-700">
                  GOOG
                </button>
                <div className="py-3"></div>
                <div className="flex">
                  <div>$ 999 &nbsp;</div>
                  <div className="flex items-center text-green-500">
                    <BiSolidUpArrow />
                    <div> &nbsp;27%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* right */}
          <div className="w-1/2">
            <div>
              Google LLC is an American multinational corporation and technology
              company focusing on online advertising, search engine technology,
              cloud computing, computer software, quantum computing, e-commerce,
              consumer electronics, and artificial intelligence
            </div>
            <br />
            <br />
            <div className="flex">
              <button className="flex mx-3 bg-orange-500 text-black p-3 lg:px-5 border rounded-md items-center">
                <FaBookmark />
                &nbsp;Follow Stock
              </button>
              <button className="mx-3 p-3 lg:px-5 bg-gray-500 border rounded-md">
                <FaShareAlt />
              </button>
              <button className="mx-3 p-3 lg:px-5 bg-gray-500 border rounded-md">
                Ask AI
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* stock */}
      <div className="w-full h-14 lg:h-18 flex justify-center my-10">
        <div className="bg-gray-500 w-[90%] h-full rounded-lg items-center flex justify-evenly">
          <div className="flex">
            {" "}
            <div>Market Cap </div>
            <div>&nbsp;2.6T</div>
          </div>
          <div className="flex">
            <div>52W Range</div>
            <div>&nbsp;68.4 - 98K</div>
          </div>
          <div className="flex">
            <div>Day's Range</div>
            <div>&nbsp;1-2K</div>
          </div>
          <div className="flex">
            <div>Volume</div>
            <div>&nbsp;20M</div>
          </div>
        </div>
      </div>
      {/*  */}
      <div></div>
      {/*  */}
      <div></div>
      {/*  */}
      {/* <Ad /> */}
      <CompanyProfile />
      <BestPerform />
      <IndexETF />
      <Footer />
    </div>
  );
};

export default Stock;
