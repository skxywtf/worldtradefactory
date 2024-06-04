import React, { useRef } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Link } from "react-router-dom";
import { data } from "../data/IndexETFData";

const BestPerform = () => {
  const sliderRef = useRef(null);

  const slide = (direction) => {
    const slider = sliderRef.current;
    const scrollAmount = direction === "left" ? -500 : 500;
    if (slider) {
      slider.scrollLeft += scrollAmount;
    }
  };

  return (
    <div>
      <h1 className="mt-10 text-3xl pl-14 lg:pl-20">Best Performing</h1>
      <div className="relative flex items-center py-20 px-3">
        <MdChevronLeft
          className="opacity-50 rounded-full bg-gray-800 cursor-pointer hover:opacity-100"
          onClick={() => slide("left")}
          size={40}
        />

        <div
          ref={sliderRef}
          className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {data.map((item) => (
            <Link
              to={`/stock`}
              key={item.id}
              className="w-[260px] group hover:bg-gradient-to-t from-black to-[#0510a5] border border-gray-500  mx-2 h-full py-5 rounded-md inline-block p-2 cursor-pointer gap-3 ease-in-out duration-300 bg-[#2c2b2b]"
            >
              <div className="flex justify-between pt-3 px-7 mb-10 gap-6">
                <img
                  className="w-[60px] h-[60px] rounded-full"
                  src={item.img}
                  alt={item.name}
                />
                <div className=" text-xl ">
                  {" "}
                  <h1 className=" font-bold text-3xl tracking-wider">78</h1>
                  <h1 className="  "> Score</h1>
                </div>
              </div>
              <div className="flex h-full items-end justify-center w-full pt-3 pb-3">
                <button className=" flex h-full items-end rounded-3xl tracking-widest border border-white font-semibold  text-white bg-[#3c3c3c] p-3 shadow-md group-hover:text-black group-hover:bg-white">
                  GOOG
                </button>
              </div>
              <div className="text-center text-xl py-3">Google Corp</div>
            </Link>
          ))}
        </div>

        <MdChevronRight
          className="opacity-50 cursor-pointer hover:opacity-100 rounded-full bg-gray-800 "
          onClick={() => slide("right")}
          size={40}
        />
      </div>
    </div>
  );
};

export default BestPerform;
