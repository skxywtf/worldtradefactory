"use client";
import React, { useEffect } from "react";

const ForexHeatMap: React.FC = () => {
  useEffect(() => {
    const widgetContainer = document.getElementById(
      "tradingview-widget-container__widget"
    );

    // Check if the script already exists to prevent it from appending twice
    if (widgetContainer && !widgetContainer.querySelector("script")) {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-forex-heat-map.js";
      script.async = true;
      script.innerHTML = JSON.stringify({
        width: "100%", // Ensuring the widget takes full width
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
        colorTheme: "dark",
        locale: "en",
        backgroundColor: "#1D222D",
      });
      widgetContainer.appendChild(script);
    }
  }, []);

  return (
    <div className="tradingview-widget-container w-full">
      <div
        id="tradingview-widget-container__widget"
        className="w-screen px-10"
      ></div>
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
}

export default ForexHeatMap;
