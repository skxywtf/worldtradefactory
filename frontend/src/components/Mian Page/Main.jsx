import React from "react";
import MainSearch from "./MainSearch";
import MarketLeaders from "./MarketLeaders";
import Ad from "./Ad";
import IndexETF from "./IndexETF";
import TopMovers from "./TopMovers";
import TopPicks from "./TopPicks";
import BestPerform from "./BestPerform";
import MostTweets from "./MostTweets";
import RecFol from "./RecFol";
import Navbar from "../header and Footer/Navbar";
import Footer from "../header and Footer/Footer";

import markData from "../../data/MarketLeadersData";
import recentData from "../../data/RecentlyData";
import FollowedData from "../../data/FollowedData";
import marketNewsData from "../../data/MarketNewsData";
import MarketNews from "./MarketNews";

const Main = () => {
  const { stocks } = markData;
  const { recentStocks } = recentData;
  const { followedStocks } = FollowedData;
  const { Topnews } = marketNewsData;
  // bg-[#192032]    bg-[rgba(17,24,42,255)]  bg-[#070723]  bg-[#111827]  {  bg-[#0c101e]  }
  return (
    <div className=" ">
      <Navbar />
      <MainSearch />
      <MarketLeaders stocks={stocks} />
      {/* <Ad /> */}
      <RecFol recentStocks={recentStocks} followedStocks={followedStocks} />
      <IndexETF />
      <TopMovers />
      <MarketNews Topnews={Topnews} />
      {/* <TopPicks /> */}
      <MostTweets />
      <BestPerform />
      <Footer />
    </div>
  );
};

export default Main;
