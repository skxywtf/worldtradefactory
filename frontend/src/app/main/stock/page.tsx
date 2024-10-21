"use client";


import React, { useEffect, useState } from "react";
import Head from "next/head";
import './global.css';
import Stock from "@/components/Stock Page/Stock";
import { usePathname, useSearchParams } from "next/navigation";
import {SymbolProvider} from "@/components/Stock Page/SymbolContext";
import Header from "@/components/Stock Page/Header"; // Adjust import path as needed
// import Navbar from "@/components/header and Footer/Navbar";
import Footer from "@/components/header and Footer/Footer"; // Adjust import path as needed
// import MainContent from "./MainContent"; // Adjust import path as needed
// import Stock from "@/components/Stock Page/Stock";
// import Stock from "@/components/Stock Page/Stock";
import TickerTape from "@/components/Stock Page/TickerTape"; // Adjust import path as needed

const StockPage: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedSymbol, setSelectedSymbol] = useState<string>("NASDAQ:AAPL");
  // console.log(pathname,)

  useEffect(() => {
    const symbolFromUrl = searchParams.get("tvwidgetsymbol");
    // console.log(symbolFromUrl)
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
  // console.log(selectedSymbol)
  return (
    <>
      <Head>
        <title>Stock Details</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <SymbolProvider>  
        {/* initialSymbol={selectedSymbol}> */}
        <Header />
        {/* <HeaderLand /> */}
        <TickerTape onSymbolChange={handleSymbolChange} />
        <Stock  />
        <Footer />
      </SymbolProvider>
    </>
  );
};

export default StockPage;

