"use client";
import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

const ForexCrossRates: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const container = containerRef.current;

    if (container && !container.querySelector("script")) {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js";
      script.async = true;
      script.innerHTML = JSON.stringify({
        width: "100%",
        height: "100%",
        currencies: ["EUR", "USD", "JPY", "GBP", "CHF", "AUD", "CAD", "NZD"],
        isTransparent: false,
        colorTheme: theme === "dark" ? "dark" : "light",
        locale: "en",
        backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF",
      });

      container.appendChild(script);
    }

    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [theme]);

  return (
    <div className="h-full md:h-screen w-full px-5">
      <div className="tradingview-widget-container sm:h-[75%] w-full" ref={containerRef}>
        <div className="tradingview-widget-copyright"></div>
      </div>
    </div>
  );
};

export default ForexCrossRates;