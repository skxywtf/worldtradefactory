"use client";
import ETFHeatMap from "../../../components/embeded codes/HeatMaps/ETFHeatMap";
import ForexCrossRates from "../../../components/embeded codes/ForexCrossRates";
export default function MarketUpdatePage() {
  return (
    <div className=" h-full w-full">
      <div className=" w-full"> 
        {/* <ETFHeatMap /> */}
        <ForexCrossRates />
      </div>
   
    </div>
  )
}
