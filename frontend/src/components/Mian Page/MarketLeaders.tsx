"use client";

import React, { useRef } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Graph from "../Stock Page/Graph";

// Define the type for the props
interface MarketLeadersProps {
  stocks: { symbol: string; id: string }[]; // Adjust according to your actual data
}

const MarketLeaders: React.FC<MarketLeadersProps> = ({ stocks }) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 500;
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 500;
    }
  };

  return (
    <div className="">
      <div className="w-full flex">
        <h1 className="mt-20 text-2xl lg:text-3xl pl-16 lg:pl-20">
          Market Spotlight: Top Companies{" "}
          <span className="font-bold">{">"}</span>
        </h1>
      </div>

      <div className="relative flex items-center py-10 px-2 md:px-5">
        <MdChevronLeft
          className="opacity-50 cursor-pointer rounded-full dark:bg-gray-300 bg-[#192032] hover:opacity-100"
          onClick={slideLeft}
          size={40}
        />

        <div
          ref={sliderRef}
          id="slider2"
          className="w-full h-full overflow-x-scroll flex gap-3 whitespace-nowrap scroll-smooth scrollbar-hide"
          style={{ display: "flex", overflowX: "scroll", whiteSpace: "nowrap" }}
        >
          <div className="flex gap-3">
            {stocks.map((stock) => (
              <div key={stock.id} className="flex-shrink-0" style={{ width: "350px" }}>
                <Graph symbol={stock.symbol} id={stock.id} />
              </div>
            ))}
          </div>
        </div>

        <MdChevronRight
          className="opacity-50 cursor-pointer rounded-full dark:bg-gray-300 bg-gray-800 hover:opacity-100"
          onClick={slideRight}
          size={40}
        />
      </div>
    </div>
  );
};

export default MarketLeaders;
