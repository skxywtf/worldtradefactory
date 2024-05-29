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
      <h1 className="mt-10 text-3xl pl-4">Best Performing Stocks</h1>
      <div className="relative flex items-center py-20">
        <MdChevronLeft
          className="opacity-50 cursor-pointer hover:opacity-100"
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
              className="w-[220px] mx-2 h-full py-5 rounded-md inline-block p-2 cursor-pointer gap-3 hover:scale-105 ease-in-out duration-300 bg-[#2c2b2b]"
            >
              <div className="flex gap-6">
                <img className="w-10 h-10" src={item.img} alt={item.name} />
                <h1>98</h1>
                <h1>score</h1>
              </div>
              <div className="flex justify-center w-full py-5">
                <button className="p-1 rounded-lg bg-gray-600">Google</button>
              </div>
              <div className="text-center py-7">Lorem, ipsum dolor.</div>
            </Link>
          ))}
        </div>

        <MdChevronRight
          className="opacity-50 cursor-pointer hover:opacity-100"
          onClick={() => slide("right")}
          size={40}
        />
      </div>
    </div>
  );
};

export default BestPerform;
