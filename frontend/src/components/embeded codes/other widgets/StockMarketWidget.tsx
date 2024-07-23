"use client";
import React, { useEffect, useRef } from "react";

const StockMarketWidget: React.FC = () => {
  // Type the ref to be either HTMLDivElement or null
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (container && !container.querySelector("script")) {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-hotlists.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        colorTheme: "dark",
        dateRange: "12M",
        exchange: "US",
        showChart: true,
        locale: "en",
        width: "100%",
        height: "100%",
        largeChartUrl: "",
        isTransparent: false,
        showSymbolLogo: false,
        showFloatingTooltip: false,
        plotLineColorGrowing: "rgba(41, 98, 255, 1)",
        plotLineColorFalling: "rgba(41, 98, 255, 1)",
        gridLineColor: "rgba(42, 46, 57, 0)",
        scaleFontColor: "rgba(209, 212, 220, 1)",
        belowLineFillColorGrowing: "rgba(41, 98, 255, 0.12)",
        belowLineFillColorFalling: "rgba(41, 98, 255, 0.12)",
        belowLineFillColorGrowingBottom: "rgba(41, 98, 255, 0)",
        belowLineFillColorFallingBottom: "rgba(41, 98, 255, 0)",
        symbolActiveColor: "rgba(41, 98, 255, 0.12)"
      });

      // Append script to container after a delay to ensure DOM is fully ready
      const timeoutId = setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.appendChild(script);
        }
      }, 100);

      // Clear the timeout if component unmounts before script is appended
      return () => {
        clearTimeout(timeoutId);
        if (container && container.querySelector("script")) {
          container.removeChild(container.querySelector("script") as HTMLScriptElement);
        }
      };
    }
  }, []);

  return (
    <div className="h-screen w-screen">
      <div
        className="tradingview-widget-container h-full w-full px-5 py-20"
        ref={containerRef}
      >
        <div className="tradingview-widget-container__widget"></div>
        <div className="tradingview-widget-copyright"></div>
      </div>
    </div>
  );
};

export default StockMarketWidget;
