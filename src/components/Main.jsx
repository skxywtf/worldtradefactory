import React from "react";
import MainSearch from "./MainSearch";
import MarketLeaders from "./MarketLeaders";
import Ad from "./Ad";
import IndexETF from "./IndexETF";
import TopMovers from "./TopMovers";
import TopPicks from "./TopPicks";
import BestPerform from "./BestPerform";
import MostTweets from "./MostTweets";

import markData from "../data/MarketLeadersData";

const Main = () => {
  const { stocks } = markData;
  return (
    <div className="px-3">
      <MainSearch />
      <MarketLeaders stocks={stocks} />
      <Ad />
      <IndexETF />
      <TopMovers />
      <TopPicks />
      <MostTweets />
      <BestPerform />
    </div>
  );
};

export default Main;
