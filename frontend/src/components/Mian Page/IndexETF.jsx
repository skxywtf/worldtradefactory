import React from "react";
import { data } from "../../data/IndexETFData.js";
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
      <div cl>
        <h1 className="mt-10 text-3xl pl-10">Index ETFs Best Stocks{">"}</h1>
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
                className="w-[270px] mx-2 h-full  bg-opacity-50 dark:bg-gray-200 bg-[#192032] shadow-lg hover:border border-gray-400  py-5 rounded-md inline-block p-2 cursor-pointer gap-3  group "
              >
                <div className="flex  w-full py-2 gap-3 px-5">
                  <div className="h-8 w-8 rounded-full">
                    <img className="rounded-full" src={item.img} alt="" />
                  </div>
                  <button className=" px-2 dark:bg-gray-400  border-white font-medium text-white  bg-[#070e25] shadow-md rounded-3xl  group-hover:text-white group-hover:bg-[#4f46e5]">
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
