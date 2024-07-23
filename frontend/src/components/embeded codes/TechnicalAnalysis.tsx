"use client";
import React, { useEffect } from "react";

const TechnicalAnalysis: React.FC = () => {
  useEffect(() => {
    const widgetContainer = document.getElementById(
      "tradingview-technical-analysis-widget"
    ) as HTMLDivElement | null;

    if (widgetContainer) {
      // Remove any existing widget
      if (widgetContainer.childNodes.length === 0) {
        const script = document.createElement("script");
        script.src =
          "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
        script.async = true;
        script.innerHTML = JSON.stringify({
          interval: "1m",
          width: "100%",
          isTransparent: false,
          height: 400,
          symbol: "NASDAQ:AAPL",
          showIntervalTabs: true,
          displayMode: "single",
          locale: "en",
          colorTheme: "dark",
        });

        widgetContainer.appendChild(script);
      }
    }

    return () => {
      if (widgetContainer) {
        widgetContainer.innerHTML = ""; // Clean up script when component unmounts
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container h-[400px] w-full">
      <div
        id="tradingview-technical-analysis-widget"
        className="h-full w-full"
      ></div>
      <div className="tradingview-widget-copyright"></div>
    </div>
  );
};

export default TechnicalAnalysis;
