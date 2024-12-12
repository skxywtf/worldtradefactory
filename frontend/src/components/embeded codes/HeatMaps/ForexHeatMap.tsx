"use client";
import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

const ForexHeatMap: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const container = containerRef.current;

    if (container && !container.querySelector("script")) {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-forex-heat-map.js";
      script.async = true;
      script.innerHTML = JSON.stringify({
        width: "100%",
        height: 400,
        currencies: [
          "EUR",
          "USD",
          "JPY",
          "GBP",
          "CHF",
          "AUD",
          "CAD",
          "NZD",
          "CNY",
        ],
        isTransparent: false,
        colorTheme: theme === "dark" ? "dark" : "light",
        locale: "en",
        backgroundColor: theme === "dark" ? "#1D222D" : "#FFFFFF",
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
    <div className="tradingview-widget-container w-full" ref={containerRef}>
      <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/"
          rel="noopener noreferrer nofollow"
          target="_blank"
          className="text-blue-500"
        >
          <span>Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
};

export default ForexHeatMap;