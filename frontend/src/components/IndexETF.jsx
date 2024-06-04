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
                className="w-[270px] mx-2 h-full py-5 rounded-md inline-block p-2 cursor-pointer gap-3  ease-in-out duration-300 group bg-[#212121] hover:bg-gradient-to-t from-black to-[#10177b] border border-gray-500"
              >
                <div className="flex  w-full py-2 px-5">
                  <button className="p-2 rounded-3xl  border border-white font-medium text-white bg-[#3c3c3c]  shadow-md group-hover:text-black group-hover:bg-white">
                    Google
                  </button>
                </div>
                <div className="px-5 py-5">Lorem, ipsum dolor.</div>
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
