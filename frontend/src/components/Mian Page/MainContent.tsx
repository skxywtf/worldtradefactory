"use client";

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
import CompanyProfile from "../embeded codes/other widgets/CompanyProfile";

// Define types for the data imported
interface StockData {
  stocks: any[]; // Replace `any` with the actual type if known
}

interface RecentData {
  recentStocks: any[]; // Replace `any` with the actual type if known
}

interface FollowedData {
  followedStocks: any[]; // Replace `any` with the actual type if known
}

interface MarketNewsData {
  Topnews: any[]; // Replace `any` with the actual type if known
}

const MainContent: React.FC = () => {
  const { stocks }: StockData = markData;
  const { recentStocks }: RecentData = recentData;
  const { followedStocks }: FollowedData = FollowedData;
  const { Topnews }: MarketNewsData = marketNewsData;

  return (
    <div className="dark:bg-gray-200 dark:text-black">
      <Navbar />
      <MainSearch />
      <MarketLeaders stocks={stocks} />
      {/* <Ad /> */}
      <RecFol />
      <IndexETF />
      <TopMovers />
      <MarketNews />
      {/* <TopPicks /> */}
      <MostTweets />
      <BestPerform />
      <Footer />
    </div>
  );
};

export default MainContent;
