import React from "react";
import StockheatMap from "../../embeded codes/HeatMaps/StockHeatMap";
import ETFHeatMap from "@/components/embeded codes/HeatMaps/ETFHeatMap";
const HeatMaps = () => {
  return (
    <div className="h-svh w-svh px-10">
      <StockheatMap />
      <br />
      <br />
      <br />
      <ETFHeatMap />
    </div>
  );
};

export default HeatMaps;
