"use client";

import Link from "next/link";
import data2 from "../../data/FollowedData";

const Followed = () => {
  const { followedStocks } = data2;
  return (
    <div className="h-[450px] w-full">
      <h1 className="text-4xl pl-10 pb-8 ">Followed Stocks{">"}</h1>
      <div className="h-full w-full  overflow-y-auto no-scrollbar px-5">
        {followedStocks.map((followedStock, index) => (
          <Link
            key={index}
            href="/main/stock"
            className="w-full  bg-opacity-50 dark:bg-gray-200 bg-[#192032] shadow-lg hover:border border-gray-400  mx-2 mb-5 py-5 rounded-md inline-block p-2 cursor-pointer gap-3  group"
          >
            <div className="flex">
              <div className="flex items-center px-2">
                <div className="h-24 w-16 rounded-full">
                  <img src={followedStock.img} alt="Stock" />
                </div>
                <div>
                  <div className="flex py-2 px-5">
                    <button className="p-2 px-3 rounded-3xl font-medium text-white bg-[#070e25] shadow-md group-hover:text-black group-hover:bg-white">
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
