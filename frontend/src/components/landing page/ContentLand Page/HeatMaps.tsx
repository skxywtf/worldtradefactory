import React from "react";
import StockheatMap from "../../embeded codes/HeatMaps/StockHeatMap";
import CryptoCoinHeatMap from "../../embeded codes/HeatMaps/CryptoCoinHeatMap";
const HeatMaps = () => {
  return (
    <div className=" h-svh w-svh px-10">
      <StockheatMap />
      <br />
      <br />
      <br />
      <CryptoCoinHeatMap />
    </div>
  );
};

export default HeatMaps;
