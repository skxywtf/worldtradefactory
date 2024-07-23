import React from "react";
import MarketData from "../../embeded codes/other widgets/MarketData";
import TopStories from "../../embeded codes/Advance widgets/TopStories";
import EconomicCalendar from "../../embeded codes/Advance widgets/EconomicCalendar";
import StockHeatMap from "../../embeded codes/HeatMaps/StockHeatMap";
import CryptoCoinHeatMap from "@/components/embeded codes/HeatMaps/CryptoCoinHeatMap";
import GetStarted from "./GetStarted";
import HeatMaps from "./HeatMaps";

const MainCOntentLand = () => {
  return (
    <div className=" h-full w-full ">
      {/* about market */}
      <div className="w-full h-full gap-4 px-5 block md:flex justify-center">
        <MarketData />
        <TopStories />
        <EconomicCalendar />
      </div>
      {/* heatmaps */}
      <HeatMaps />
      {/*  */}
      <div className="mb-[700px]"></div>
      <GetStarted />
    </div>
  );
};

export default MainCOntentLand;
