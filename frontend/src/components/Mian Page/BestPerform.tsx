"use client";

import React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Graph from "../Stock Page/Graph";

// Define the component
const BestPerform: React.FC = () => {
  // Function to handle sliding left
  const slideLeft = () => {
    const slider = document.getElementById("slider4") as HTMLDivElement | null;
    if (slider) {
      slider.scrollLeft -= 500;
    }
  };

  // Function to handle sliding right
  const slideRight = () => {
    const slider = document.getElementById("slider4") as HTMLDivElement | null;
    if (slider) {
      slider.scrollLeft += 500;
    }
  };

  return (
    <div>
      <h1 className="mt-10 text-3xl pl-14">Best Performing{">"}</h1>
      <div className="relative flex items-center py-20 px-3">
        <MdChevronLeft
          className="opacity-50 rounded-full dark:bg-gray-200 bg-gray-800 cursor-pointer hover:opacity-100"
          onClick={slideLeft}
          size={40}
        />

        <div
          id="slider4"
          className="w-full h-full overflow-x-scroll flex gap-3 whitespace-nowrap scroll-smooth scrollbar-hide"
          style={{ display: "flex", overflowX: "scroll", whiteSpace: "nowrap" }}
        >
          <div className="flex gap-3">
            <div className="flex-shrink-0" style={{ width: "350px" }}>
              <Graph symbol="AMEX:SPY" id="graph-90" />
            </div>
            <div className="flex-shrink-0" style={{ width: "350px" }}>
              <Graph symbol="VOO" id="graph-91" />
            </div>
            <div className="flex-shrink-0" style={{ width: "350px" }}>
              <Graph symbol="IVV" id="graph-92" />
            </div>
            <div className="flex-shrink-0" style={{ width: "350px" }}>
              <Graph symbol="VTI" id="graph-93" />
            </div>
            <div className="flex-shrink-0" style={{ width: "350px" }}>
              <Graph symbol="QQQ" id="graph-94" />
            </div>
            <div className="flex-shrink-0" style={{ width: "350px" }}>
              <Graph symbol="IJH" id="graph-95" />
            </div>
            <div className="flex-shrink-0" style={{ width: "350px" }}>
              <Graph symbol="VEA" id="graph-96" />
            </div>
            <div className="flex-shrink-0" style={{ width: "350px" }}>
              <Graph symbol="VUG" id="graph-97" />
            </div>
          </div>
        </div>

        <MdChevronRight
          className="opacity-50 cursor-pointer hover:opacity-100 rounded-full dark:bg-gray-300 bg-gray-800"
          onClick={slideRight}
          size={40}
        />
      </div>
    </div>
  );
};

export default BestPerform;
