"use client";
import React from "react";
import HeaderLand from "@/components/landing page/header footer landing/HeaderLand";
import FooterLand from "@/components/landing page/header footer landing/FooterLand";
import CryptoMarket from "@/components/embeded codes/CryptoMarket";
import CryptoCoinHeatMap from "@/components/embeded codes/HeatMaps/CryptoCoinHeatMap";
import { SideNavbar } from "@/components/SideNavbar/sideNav";

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-100 dark:bg-black text-neutral-800 dark:text-neutral-200">
      {/* Header */}
      <HeaderLand />

      <div className="flex flex-col md:flex-row">
      <SideNavbar />
      <div className="flex flex-col gap-8 w-full">
        {/* Market Widget */}
        <div className="w-full bg-neutral-200 dark:bg-black rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-neutral-100">
            Cryptocurrency Market Overview
          </h2>
          <CryptoMarket />
        </div>

        {/* Heatmap Widget */}
        <div className="w-full bg-neutral-200 dark:bg-black rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-neutral-100">
            Crypto Coins Heatmap
          </h2>
          <div className="h-[600px]">
            <CryptoCoinHeatMap />
          </div>
        </div>
      </div>
      </div>

      {/* Footer */}
      <FooterLand />
    </div>
  );
};

export default Layout;


