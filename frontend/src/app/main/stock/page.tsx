"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import './global.css';
import Stock from "@/components/Stock Page/Stock";
import { usePathname, useSearchParams } from "next/navigation";
import {SymbolProvider} from "@/components/Stock Page/SymbolContext";
import Header from "@/components/Stock Page/Header"; // Adjust import path as needed
import Footer from "@/components/header and Footer/Footer"; // Adjust import path as needed
import TickerTape from "@/components/Stock Page/TickerTape"; // Adjust import path as needed
import HeaderLand from "@/components/landing page/header footer landing/HeaderLand";
import FooterLand from "../../../components/landing page/header footer landing/FooterLand"
import { useTheme } from "next-themes";

const StockPage: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedSymbol, setSelectedSymbol] = useState<string>("NASDAQ:AAPL");
  const { theme } = useTheme(); // Get the current theme and toggle function

  useEffect(() => {
    const symbolFromUrl = searchParams.get("tvwidgetsymbol");
    if (symbolFromUrl) {
      setSelectedSymbol(decodeURIComponent(symbolFromUrl));
      localStorage.setItem("searchInput", symbolFromUrl);
    }
  }, 
  // [pathname, searchParams, selectedSymbol]          // dependecies are commented to test search functionality
  );

  const handleSymbolChange = (symbol: string) => {
    setSelectedSymbol(symbol);
    // Update the URL search params to reflect the new symbol
    const url = new URL(window.location.href);
    url.searchParams.set("tvwidgetsymbol", encodeURIComponent(symbol));
    window.history.pushState({}, "", url.toString());
  };

  return (
    <>
      <Head>
        <title>Stock Details</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
     <div className={`flex flex-col items-center`}> 
      <SymbolProvider>  
        {/* initialSymbol={selectedSymbol}> */}
        {/* <Header /> */}
        <HeaderLand />
        {/* <HeaderLand /> */}
        <TickerTape onSymbolChange={handleSymbolChange} />
        <Stock  />
        <FooterLand />
      </SymbolProvider>
      </div> 
    </>
  );
};

export default StockPage;

// ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}