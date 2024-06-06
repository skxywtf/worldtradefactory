import React, { useRef } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Link } from "react-router-dom";

const MarketLeaders = ({ stocks }) => {
  const sliderRef = useRef(null);

  const slide = (direction) => {
    const slider = sliderRef.current;
    const scrollAmount = direction === "left" ? -500 : 500;
    if (slider) {
      slider.scrollLeft += scrollAmount;
    }
  };
  // <h1 className="mt-10 text-3xl pl-14 lg:pl-20">Market Leaders</h1>
  // <h1 className="mt-10 text-3xl pl-14 lg:pl-20">Today's Top Trade</h1>;
  // dark blue bg-[#070723]      next dark blue bg-[rgba(17,24,42,255)]   next blue bg-[#192032]    bg-[#12192c]
  return (
    <div className="">
      <div className=" w-full flex">
        <h1 className="mt-20 text-2xl lg:text-3xl pl-16 lg:pl-20">
          Market Spotlight: Today's Leading Trades{" "}
          <span className=" font-bold">{">"}</span>
        </h1>
      </div>

      <div className="relative flex items-center py-10 px-2 md:px-5 ">
        <MdChevronLeft
          className="opacity-50 cursor-pointer rounded-full dark:bg-gray-300 bg-[#192032] hover:opacity-100"
          onClick={() => slide("left")}
          size={40}
        />

        <div
          ref={sliderRef}
          className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {stocks.map((item) => (
            <Link
              to={`/stock`}
              key={item.id}
              className="w-[80%] shadow-xl md:w-1/3 bg-opacity-50 dark:hover:bg-gray-100 dark:bg-gray-200 dark:bg-opacity-100  bg-[#192032] hover:border border-gray-400 group mx-3 h-full py-5 rounded-md inline-block p-2 cursor-pointer gap-5 "
            >
              <div className="flex  mt-3 px-3 mb-10 gap-5 ">
                <img
                  className="w-[60px] h-[60px]"
                  src={item.img}
                  alt={item.name}
                />
                <div className="text-xl flex flex-col  justify-between  ">
                  {" "}
                  <div>
                    <h1 className="  tracking-wider">Nvidia Corp</h1>
                  </div>
                  <div className=" w-full flex">
                    <div className=" text-lg px-2  tracking-wider dark:text-white dark:bg-gray-400 bg-[#040814] shadow-md rounded-xl  group-hover:text-white group-hover:bg-[#4f46e5]">
                      NVDA
                    </div>
                  </div>
                </div>
                <div className=" hidden md:flex flex-col items-end justify-center md:ml-6">
                  <div>
                    1150.00 <span className=" text-sm">USD</span>
                  </div>
                  <div className=" text-lg text-green-400">+4.9%</div>
                </div>
              </div>
              <div className="flex flex-wrap  px-2 pt-3 pb-3">
                <div className=" text-lg whitespace-pre-wrap">
                  Nvidia Corporation is an American multinational corporation
                  and technology company headquartered in Santa Clara,
                  California, and incorporated in Delaware.
                </div>
              </div>
            </Link>
          ))}
        </div>

        <MdChevronRight
          className="opacity-50 cursor-pointer rounded-full dark:bg-gray-300  bg-gray-800 hover:opacity-100"
          onClick={() => slide("right")}
          size={40}
        />
      </div>
    </div>
  );
};

export default MarketLeaders;
