import React from "react";
import { data } from "../data/IndexETFData.js";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Link } from "react-router-dom";
const IndexETF = () => {
  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <>
      <div>
        <h1 className="mt-10 text-3xl pl-4">Index ETFs Best Stocks</h1>
        <div className="relative flex  items-center py-20">
          <MdChevronLeft
            className="opacity-50 cursor-pointer hover:opacity-100"
            onClick={slideLeft}
            size={40}
          />

          <div
            id="slider"
            className="w-full h-full overflow-x-scroll  scroll whitespace-nowrap scroll-smooth scrollbar-hide"
          >
            {data.map((item) => (
              <Link
                to="/stock"
                className="w-[220px] mx-2 h-full py-5 rounded-md inline-block p-2 cursor-pointer gap-3 hover:scale-105 ease-in-out duration-300 bg-[#2c2b2b]"
              >
                <div className="flex justify-center w-full py-3">
                  <button className="p-1 rounded-lg bg-gray-600">Google</button>
                </div>
                <div className="text-center py-7">Lorem, ipsum dolor.</div>
              </Link>
            ))}
          </div>
          <MdChevronRight
            className="opacity-50 cursor-pointer hover:opacity-100"
            onClick={slideRight}
            size={40}
          />
        </div>
      </div>
    </>
  );
};

export default IndexETF;
