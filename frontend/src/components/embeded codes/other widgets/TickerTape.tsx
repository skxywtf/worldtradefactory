"use client";
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

const TickerTape: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();
  // const [theme, setTheme] = useState("dark");

  const detectTheme = () => {
    const userPreferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    // setTheme(userPreferredTheme);
  };

  useEffect(() => {
    detectTheme();
    const themeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    themeMediaQuery.addEventListener("change", (e) => {
      // setTheme(e.matches ? "dark" : "light");
    });

    const container = containerRef.current;

    if (container && !container.querySelector("script")) {
      container.innerHTML = ""; // Clear previous widget content

      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        symbols: [
          { proName: "FOREXCOM:SPXUSD", title: "S&P 500 Index" },
          { proName: "FOREXCOM:NSXUSD", title: "US 100 Cash CFD" },
          { proName: "FX_IDC:EURUSD", title: "EUR to USD" },
          { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
          { proName: "BITSTAMP:ETHUSD", title: "Ethereum" }
        ],
        showSymbolLogo: true,
        isTransparent: false,
        displayMode: "adaptive",
        colorTheme: theme === "dark" ? "dark" : "light",
        "largeChartUrl": "http://localhost:3000/Stock",
        locale: "en"
      });

      const timeoutId = setTimeout(() => {
        container.appendChild(script);
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        if (container) {
          container.innerHTML = "";
        }
      };
    }
  }, [theme]);

  return (
    <div className="w-full">
      <div className="tradingview-widget-container w-full" ref={containerRef}>
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </div>
  );
};

export default TickerTape;
