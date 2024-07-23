"use client";

import React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Graph from "../Stock Page/Graph"; // Assuming this file has a .tsx extension

const IndexETF: React.FC = () => {
  // Function to handle sliding left
  const slideLeft = () => {
    const slider = document.getElementById("slider") as HTMLDivElement | null;
    if (slider) {
      slider.scrollLeft -= 500;
    }
  };

  // Function to handle sliding right
  const slideRight = () => {
    const slider = document.getElementById("slider") as HTMLDivElement | null;
    if (slider) {
      slider.scrollLeft += 500;
    }
  };

  return (
    <div className="index-etf-container">
      <h1 className="mt-10 text-3xl pl-10">Index ETFs Best Stocks {">"}</h1>
      <div className="relative flex items-center py-20">
        <MdChevronLeft
          className="opacity-50 rounded-full dark:bg-gray-300 bg-gray-800 cursor-pointer hover:opacity-100"
          onClick={slideLeft}
          size={40}
        />

        <div
          id="slider"
          className="w-full h-full overflow-x-scroll flex gap-3 whitespace-nowrap scroll-smooth scrollbar-hide"
          style={{ display: "flex", overflowX: "scroll", whiteSpace: "nowrap" }}
        >
          <div className="flex gap-3">
            <div className="flex-shrink-0" style={{ width: "350px" }}>
              <Graph symbol="AMEX:SPY" id="graph-20" />
            </div>
            <div className="flex-shrink-0" style={{ width: "350px" }}>
              <Graph symbol="VOO" id="graph-21" />
            </div>
            <div className="flex-shrink-0" style={{ width: "350px" }}>
              <Graph symbol="IVV" id="graph-22" />
            </div>
            <div className="flex-shrink-0" style={{ width: "350px" }}>
              <Graph symbol="VTI" id="graph-23" />
            </div>
            <div className="flex-shrink-0" style={{ width: "350px" }}>
              <Graph symbol="QQQ" id="graph-24" />
            </div>
            <div className="flex-shrink-0" style={{ width: "350px" }}>
              <Graph symbol="IJH" id="graph-25" />
            </div>
            <div className="flex-shrink-0" style={{ width: "350px" }}>
              <Graph symbol="VEA" id="graph-26" />
            </div>
            <div className="flex-shrink-0" style={{ width: "350px" }}>
              <Graph symbol="VUG" id="graph-27" />
            </div>
            <div className="flex-shrink-0" style={{ width: "350px" }}>
              <Graph symbol="IEFA" id="graph-28" />
            </div>
            <div className="flex-shrink-0" style={{ width: "350px" }}>
              <Graph symbol="VTV" id="graph-29" />
            </div>
            <div className="flex-shrink-0" style={{ width: "350px" }}>
              <Graph symbol="AGG" id="graph-30" />
            </div>
            <div className="flex-shrink-0" style={{ width: "350px" }}>
              <Graph symbol="BND" id="graph-31" />
            </div>
          </div>
        </div>

        <MdChevronRight
          className="opacity-50 rounded-full dark:bg-gray-300 bg-gray-800 cursor-pointer hover:opacity-100"
          onClick={slideRight}
          size={40}
        />
      </div>
    </div>
  );
};

export default IndexETF;
