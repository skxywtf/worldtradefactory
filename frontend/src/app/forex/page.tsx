"use client";
import ForexCrossRates from "@/components/embeded codes/ForexCrossRates";
import ForexHeatMap from "@/components/embeded codes/HeatMaps/ForexHeatMap";
import FooterLand from "@/components/landing page/header footer landing/FooterLand";
import HeaderLand from "@/components/landing page/header footer landing/HeaderLand";
import { useTheme } from "next-themes";

export default function ForexDashboard() {
  const { theme } = useTheme();

  return (
    <div
      className={`h-full w-full right-0 ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* Header */}
      <HeaderLand />

      {/* Main Content */}
      <div className="py-10 px-5">
        {/* Forex Cross Rates Widget */}
        <div>
          <h2 className="text-xl font-semibold mb-6 px-4">Forex Cross Rates</h2>
          <ForexCrossRates />
        </div>

        {/* Forex Heatmap Widget */}
        <div className="mx-4">
          <h2 className="text-xl font-semibold my-6">Forex Heatmap</h2>
          <ForexHeatMap />
        </div>
      </div>

      {/* Footer */}
      <FooterLand />
    </div>
  );
}