"use client"
import EconomicCalendar from "@/components/embeded codes/Advance widgets/EconomicCalendar";
import TopStories from "@/components/embeded codes/Advance widgets/TopStories";
import ETFHeatMap from "@/components/embeded codes/HeatMaps/ETFHeatMap";
import StockHeatMap from "@/components/embeded codes/HeatMaps/StockHeatMap";
import MarketData from "@/components/embeded codes/other widgets/MarketData";
import TickerTape from "@/components/embeded codes/other widgets/TickerTape";
import GetStarted from "@/components/landing page/ContentLand Page/GetStarted";
import FooterLand from "@/components/landing page/header footer landing/FooterLand";
import HeaderLand from "@/components/landing page/header footer landing/HeaderLand";

export default function Home() {
    return(
        <div className="w-full bg-white dark:bg-black">
            <HeaderLand />
            <TickerTape />

            <div className="flex py-8 flex-col justify-center items-center gap-4 md:flex-row md:items-start">
            <MarketData />
            <TopStories />
            <EconomicCalendar />
            </div>

            <div className="h-screen p-10 pt-0">
            <StockHeatMap />
            </div>
            <div className="h-screen px-10">
            <ETFHeatMap />
            </div>

            <GetStarted />

            <FooterLand />
        </div>
    )
}