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

import markData from "../data/MarketLeadersData";
import recentData from "../data/RecentlyData";
import FollowedData from "../data/FollowedData";
import Navbar from "./Navbar";

const Main = () => {
  const { stocks } = markData;
  const { recentStocks } = recentData;
  const { followedStocks } = FollowedData;

  return (
    <div className="">
      <Navbar />
      <MainSearch />
      <MarketLeaders stocks={stocks} />
      {/* <Ad /> */}
      <RecFol recentStocks={recentStocks} followedStocks={followedStocks} />
      <IndexETF />
      <TopMovers />
      {/* <TopPicks /> */}
      <MostTweets />
      <BestPerform />
    </div>
  );
};

export default Main;
