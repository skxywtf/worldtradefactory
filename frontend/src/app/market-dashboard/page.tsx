"use client";

import TickerTape from "@/components/embeded codes/other widgets/TickerTape";
import TechnicalAnalysis from "@/components/embeded codes/TechnicalAnalysis";


export default function MarketDashboard() {
  return (
    <div className="h-full w-full">
      <div className=" w-full ">
        <TickerTape />
        <TechnicalAnalysis />
      </div>
    </div>
  )
}
