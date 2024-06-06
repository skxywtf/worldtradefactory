import React, { useRef } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Link } from "react-router-dom";
import { data } from "../../data/IndexETFData";

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
      <h1 className="mt-10 text-3xl pl-14 ">Best Performing{">"}</h1>
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
              className="md:w-1/3 group shadow-md bg-opacity-50  bg-[#192032] hover:border border-gray-400  mx-2 h-full py-5 rounded-md inline-block p-2 cursor-pointer gap-3  "
            >
              <div className="flex mt-3 px-3 mb-10 gap-5 ">
                <img
                  className="w-[60px] h-[60px]  rounded-full"
                  src={item.img}
                  alt={item.name}
                />
                <div className="text-xl flex flex-col  justify-between  ">
                  <div>
                    <h1 className="  tracking-wider">Nvidia Corp</h1>
                  </div>
                  <div className=" w-full flex">
                    <div className=" text-lg px-2  tracking-wider bg-[#040814] shadow-md rounded-xl  group-hover:text-white group-hover:bg-[#4f46e5]">
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
              <div className="md:ml-20 px-2 pl-12 md:pl-2 text-xl flex justify-center md:justify-normal">
                <div className="mx-1">Score</div>

                <div className=" flex justify-center md:justify-end md:w-full ">
                  <div className="mx-1 ">89</div>
                </div>
              </div>
              {/* <div className="flex h-full items-end justify-center md:pl-20 md:justify-normal w-full pt-3 pb-3">
               <button className=" flex h-full items-end rounded-3xl tracking-widest  border-white font-semibold  text-white bg-[#070e25] px-4 p-2 shadow-md group-hover:text-black group-hover:bg-white">
                 GOOG
               </button>
             </div>
             <div className="text-center text-xl py-3">Google Corp</div> */}
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
