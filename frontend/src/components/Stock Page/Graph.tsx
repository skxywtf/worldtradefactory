"use client";
import React, { useEffect } from "react";

// Define the type for the props
interface GraphProps {
  symbol: string;
  id: string;
}

const Graph: React.FC<GraphProps> = ({ symbol, id }) => {
  useEffect(() => {
    const widgetContainer = document.getElementById(id) as HTMLDivElement | null;

    if (widgetContainer && !widgetContainer.querySelector("script")) {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js";
      script.async = true;
      script.innerHTML = JSON.stringify({
        symbol: symbol,
        width: 350, // Updated width
        isTransparent: false,
        colorTheme: "dark",
        locale: "en",
      });
      widgetContainer.appendChild(script);
    }
  }, [id, symbol]);

  return (
    <div
      id={id}
      className="tradingview-widget-container"
      style={{ position: "relative", width: "350px" }}
    >
      <div className="tradingview-widget-container__widget"></div>
      <style>
        {`
          .tradingview-widget-copyright {
            display: none !important;
          }
        `}
      </style>
    </div>
  );
};

export default Graph;
