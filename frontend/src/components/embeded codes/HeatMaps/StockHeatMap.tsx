"use client";
import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

const StockHeatMap: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const container = containerRef.current;

    if (container && !container.querySelector("script")) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
         "exchanges": [],
          "dataSource": "SPX500",
          "grouping": "no_group",
          "blockSize": "volume|1M",
          "blockColor": "change",
          "locale": "en",
          "symbolUrl": "",
          "colorTheme": "${theme === 'dark' ? 'dark' : 'light'}",
          "hasTopBar": true,
          "isDataSetEnabled": true,
          "isZoomEnabled": true,
          "hasSymbolTooltip": true,
          "isMonoSize": true,
          "width": "100%",
          "height": "90%"
        }`;

      container.appendChild(script);
    }

    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [theme]);

  return (
    <div className="tradingview-widget-container h-screen w-screen" ref={containerRef}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export default StockHeatMap;
