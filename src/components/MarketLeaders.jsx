import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { markData } from "../data/MarketLeadersData.js";

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
      <div className="relative ">
        <div className="flex overflow-hidden">
          <div ref={sliderRef} className="flex animate-loop-scroll space-x-10">
            {stocks.concat(stocks).map((item, index) => (
              <Link
                key={`${item.name}-${index}`}
                to="/stock"
                className="group bg-[#212121] hover:bg-gradient-to-t from-black to-[#0510a5] border border-gray-500 h-72 w-64 rounded-lg shadow-2xl transition-transform transform flex-shrink-0"
              >
                <div className="h-full w-full flex flex-col justify-evenly items-center text-center p-4">
                  <div className="mb-3">
                    <img
                      src={item.img}
                      alt={item.name}
                      className=" h-12 w-14 rounded-md"
                    />
                  </div>
                  <div className="mb-5 ">
                    <button className="flex tracking-widest  rounded-3xl border border-white font-bold text-white bg-[#3c3c3c] p-3 shadow-md group-hover:text-black group-hover:bg-white">
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
