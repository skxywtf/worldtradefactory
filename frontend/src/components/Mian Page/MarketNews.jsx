"use client";

import Link from "next/link";
import data3 from "../../data/MarketNewsData";

const MarketNews = () => {
  const { Topnews } = data3;
  return (
    <div className=" my-10 h-full w-full">
      <div className="my-10 text-3xl pl-14"> Market News</div>
      <div className=" h-full gap-4 px-10 flex  w-full ">
        {Topnews.map((item) => (
          <Link
            href="/main/stock"
            className=" hover:border rounded-lg bg-gray-900 hover:bg-gray-800 w-full overflow-hidden "
          >
            <div className=" flex gap-2 pt-2 px-3">
              <div className="">
                <img
                  className=" rounded-full h-10 w-10"
                  src={item.img}
                  alt={item.id}
                />
              </div>
              <div className=" h-full  justify-end text-gray-200 text-sm items-end">
                <div>Yesterday</div>
              </div>
            </div>
            <div className="w-full">
              <div className=" px-2 py-4">{item.news}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MarketNews;
