import React, { useRef } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Link } from "react-router-dom";
import Graph from "../Stock Page/Graph";

const MarketLeaders = ({ stocks }) => {
  const slideLeft = () => {
    var slider = document.getElementById("slider2");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider2");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  // <h1 className="mt-10 text-3xl pl-14 lg:pl-20">Market Leaders</h1>
  // <h1 className="mt-10 text-3xl pl-14 lg:pl-20">Today's Top Trade</h1>;
  // dark blue bg-[#070723]      next dark blue bg-[rgba(17,24,42,255)]   next blue bg-[#192032]    bg-[#12192c]
  return (
    <div className="">
      <div className=" w-full flex">
        <h1 className="mt-20 text-2xl lg:text-3xl pl-16 lg:pl-20">
          Market Spotlight: Top Companies{" "}
          <span className=" font-bold">{">"}</span>
        </h1>
      </div>

      <div className="relative flex items-center py-10 px-2 md:px-5 ">
        <MdChevronLeft
          className="opacity-50 cursor-pointer rounded-full dark:bg-gray-300 bg-[#192032] hover:opacity-100"
          onClick={slideLeft}
          size={40}
        />

        <div
          id="slider2"
          className="w-full h-full overflow-x-scroll flex gap-3 whitespace-nowrap scroll-smooth scrollbar-hide"
          style={{ display: "flex", overflowX: "scroll", whiteSpace: "nowrap" }}
        >
          <div className="flex gap-3">
            <div className="flex-shrink-0" style={{ width: "350px" }}>
              <Graph symbol="WMT" id="graph-1" />
            </div>
            <div className="flex-shrink-0" style={{ width: "350px" }}>
              <Graph symbol="AMZN" id="graph-2" />
            </div>
            <div className="flex-shrink-0" style={{ width: "350px" }}>
              <Graph symbol="AAPL" id="graph-3" />
            </div>
            <div className="flex-shrink-0" style={{ width: "350px" }}>
              <Graph symbol="UNH" id="graph-4" />
            </div>
            <div className="flex-shrink-0" style={{ width: "350px" }}>
              <Graph symbol="CVS" id="graph-5" />
            </div>
            <div className="flex-shrink-0" style={{ width: "350px" }}>
              <Graph symbol="VOW" id="graph-6" />
            </div>
            <div className="flex-shrink-0" style={{ width: "350px" }}>
              <Graph symbol="MCK" id="graph-7" />
            </div>
            <div className="flex-shrink-0" style={{ width: "350px" }}>
              <Graph symbol="GOOG" id="graph-8" />
            </div>
            <div className="flex-shrink-0" style={{ width: "350px" }}>
              <Graph symbol="COR" id="graph-9" />
            </div>
            <div className="flex-shrink-0" style={{ width: "350px" }}>
              <Graph symbol="COST" id="graph-10" />
            </div>
            <div className="flex-shrink-0" style={{ width: "350px" }}>
              <Graph symbol="JPM" id="graph-11" />
            </div>
            <div className="flex-shrink-0" style={{ width: "350px" }}>
              <Graph symbol="TTE" id="graph-12" />
            </div>
          </div>
        </div>

        <MdChevronRight
          className="opacity-50 cursor-pointer rounded-full dark:bg-gray-300  bg-gray-800 hover:opacity-100"
          onClick={slideRight}
          size={40}
        />
      </div>
    </div>
  );
};

export default MarketLeaders;
