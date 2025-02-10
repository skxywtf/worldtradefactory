"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import './global.css';
import Stock from "@/components/Stock Page/Stock";
import { usePathname, useSearchParams } from "next/navigation";
import {SymbolProvider} from "@/components/Stock Page/SymbolContext";
import TickerTape from "@/components/Stock Page/TickerTape"; // Adjust import path as needed
import HeaderLand from "@/components/landing page/header footer landing/HeaderLand";
import FooterLand from "../../../components/landing page/header footer landing/FooterLand"
import { SideNavbar } from "@/components/SideNavbar/sideNav";

const StockPage: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedSymbol, setSelectedSymbol] = useState<string>("NASDAQ:AAPL");

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
    <div>
      <Head>
        <title>Stock Details</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
     <div className='bg-white dark:bg-black'> 
       <SymbolProvider>    
        <HeaderLand />
        <div className="flex flex-col md:flex-row">
          <SideNavbar />
           <div className="w-full">
           <div className='flex h-full flex-col w-full items-center bg-white dark:bg-black'>
           <TickerTape onSymbolChange={handleSymbolChange} />            
            <Stock  />
           </div>
          </div>
        </div>
        <FooterLand />

      </SymbolProvider>

      </div> 
    </div>
  );
};

export default StockPage;

{/* // ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"} */}