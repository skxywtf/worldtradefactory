import React from "react";
import { Link } from "react-router-dom";

const MarketNews = ({ Topnews }) => {
  return (
    <div className=" my-20 h-full w-full">
      <div className=" h-full gap-4 px-10 flex  w-full ">
        {Topnews.map((item) => (
          <Link className=" w-full overflow-hidden ">
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
