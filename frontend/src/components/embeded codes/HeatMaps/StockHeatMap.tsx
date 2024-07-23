"use client";
import React, { useEffect, useRef, memo } from "react";

const StockHeatMap: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    const timeoutId = setTimeout(() => {
      if (container && !container.querySelector("script")) {
        console.log("Creating and appending script tag for TradingView widget");
        const script = document.createElement("script");
        script.src =
          "https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = `
          {
            "exchanges": [],
            "dataSource": "SPX500",
            "grouping": "sector",
            "blockSize": "market_cap_basic",
            "blockColor": "change",
            "locale": "en",
            "symbolUrl": "",
            "colorTheme": "dark",
            "hasTopBar": false,
            "isDataSetEnabled": false,
            "isZoomEnabled": true,
            "hasSymbolTooltip": true,
            "isMonoSize": false,
            "width": "100%",
            "height": "100%"
          }`;

        container.appendChild(script);

        script.onload = () => {
          console.log("TradingView widget loaded successfully");
        };
        script.onerror = (error) => {
          console.error("Error loading TradingView widget script:", error);
        };
      }
    }, 1000); // Adjust the delay as needed

    return () => {
      clearTimeout(timeoutId);
      if (container) {
        console.log("Cleaning up container");
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
      }
    };
  }, []);

  return (
    <div
      className="tradingview-widget-container"
      ref={containerRef}
      style={{ width: "100%", height: "500px" }} // Ensure the container has a size
    >
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright"></div>
    </div>
  );
};

export default memo(StockHeatMap);
