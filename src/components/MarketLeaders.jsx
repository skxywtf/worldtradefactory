import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { markData } from "../data/MarketLeadersData.js";
import nvidia from "../assests/nvidia.webp"; // Make sure this path is correct

const MarketLeaders = ({ stocks }) => {
  const sliderRef = useRef(null);

  const slide = (direction) => {
    const slider = sliderRef.current;
    const scrollAmount = direction === "left" ? -500 : 500;
    if (slider) {
      slider.scrollLeft += scrollAmount;
    }
  };

  return (
    <div className="h-full pb-32 bg-[#121212] text-white">
      <div className="pl-5">
        <div className="text-4xl ">MARKET LEADERS:</div>
        <div className="text-4xl ">TODAY'S TOP TRADE</div>
      </div>

      <br />
      <br />
      <div className="relative group">
        <div className="flex overflow-hidden">
          <div ref={sliderRef} className="flex animate-loop-scroll space-x-10">
            {stocks.concat(stocks).map((item, index) => (
              <Link
                key={`${item.name}-${index}`}
                to="/stock"
                className="bg-[#2c2b2b] hover:bg-[#0c0a32] h-60 w-48 rounded-lg shadow-lg transition-transform transform flex-shrink-0"
              >
                <div className="h-full w-full flex flex-col justify-center items-center text-center p-4">
                  <div className="mb-5">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="bg-gray-200 h-10 w-10 rounded-md"
                    />
                  </div>
                  <div className="mb-5">
                    <button className="flex items-center justify-center rounded-md border border-gray-600 text-black bg-gray-400 p-3 shadow-md">
                      {item.name}
                    </button>
                  </div>
                  <p className="text-center text-gray-300">
                    {item.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketLeaders;
