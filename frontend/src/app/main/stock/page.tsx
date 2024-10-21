"use client";


import React, { useEffect, useState } from "react";
import Head from "next/head";
import './global.css';
import Stock from "@/components/Stock Page/Stock";
import { SymbolProvider } from "@/components/Stock Page/SymbolContext";
import Header from "@/components/Stock Page/Header"; // Adjust import path as needed
import Footer from "@/components/header and Footer/Footer"; // Adjust import path as needed
import TickerTape from "@/components/Stock Page/TickerTape"; // Adjust import path as needed


const StockPage: React.FC = () => {
  const [selectedSymbol, setSelectedSymbol] = useState<string>("");

  useEffect(() => {
    // Read symbol from localStorage
    const symbolFromStorage = localStorage.getItem("stockSymbol");
    if (symbolFromStorage) {
      setSelectedSymbol(symbolFromStorage);
    }
  }, []);

  const handleSymbolChange = (symbol: string) => {
    setSelectedSymbol(symbol);
    // Optionally, you can update localStorage here if needed
    localStorage.setItem("stockSymbol", symbol);
    // Update URL without query parameters
    const url = new URL(window.location.href);
    url.pathname = "/main/stock";
    window.history.pushState({}, "", url.toString());
  };

  return (
    <>
      <Head>
        <title>Stock Details</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <SymbolProvider>  
        {/* initialSymbol={selectedSymbol}> */}
        <Header />
        <TickerTape onSymbolChange={handleSymbolChange} />
        <Stock  />
        <Footer />
      </SymbolProvider>
    </>
  );
};

export default StockPage;

