"use client";
import React, { useEffect } from "react";

const Screener: React.FC = () => {
  useEffect(() => {
    const widgetContainer = document.getElementById("tradingview-screener-widget") as HTMLDivElement | null;

    if (widgetContainer && widgetContainer.childNodes.length === 0) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-screener.js";
      script.async = true;
      script.innerHTML = JSON.stringify({
        width: "100%",
        height: "100%",
        defaultColumn: "overview",
        defaultScreen: "most_capitalized",
        market: "america",
        showToolbar: true,
        colorTheme: "dark",
        locale: "en",
      });

      widgetContainer.appendChild(script);
    }
  }, []);

  return (
    <div className="h-full md:h-screen w-screen px-10 py-20">
      <div className="tradingview-widget-container sm:h-full w-full">
        <div id="tradingview-screener-widget" className="h-full w-full"></div>
        <div className="tradingview-widget-copyright"></div>
      </div>
    </div>
  );
};

export default Screener;
