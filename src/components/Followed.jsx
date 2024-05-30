import React from "react";
import { Link } from "react-router-dom";

const Followed = ({ followedStocks }) => {
  return (
    <div className="h-[450px] w-full">
      <h1 className="text-4xl pl-5 pb-8 ">Followed Stocks</h1>
      <div className="h-full w-full  overflow-y-auto no-scrollbar px-5">
        {followedStocks.map((followedStock, index) => (
          <Link
            key={index}
            to="/stock"
            className="w-full mx-2 mb-5 py-5 rounded-md inline-block p-2 cursor-pointer gap-3 ease-in-out duration-300 group bg-[#212121] hover:bg-gradient-to-t from-black to-[#10177b] border border-gray-500"
          >
            <div className="flex">
              <div className="flex items-center px-2">
                <div className="h-24 w-16">
                  <img src={followedStock.img} alt="Stock" />
                </div>
                <div>
                  <div className="flex py-2 px-5">
                    <button className="p-2 px-3 rounded-3xl border border-white font-medium text-white bg-[#3c3c3c] shadow-md group-hover:text-black group-hover:bg-white">
                      {followedStock.name}
                    </button>
                  </div>
                  <div className="px-5 py-5">Lorem, ipsum dolor.</div>
                </div>
              </div>
              <div className="h-auto w-1/3 flex justify-end text-2xl items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className=" ">View Stock</div>
                <div className="px-3">{">"}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Followed;
