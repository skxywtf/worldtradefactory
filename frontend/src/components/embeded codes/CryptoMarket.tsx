"use client";
import React, { useEffect } from "react";

const CryptoMarket: React.FC = () => {
  useEffect(() => {
    const widgetContainer = document.getElementById(
      "tradingview-crypto-market-widget"
    ) as HTMLDivElement | null;

    if (widgetContainer && widgetContainer.childNodes.length === 0) {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-screener.js";
      script.async = true;
      script.innerHTML = JSON.stringify({
        width: "100%",
        height: 550,
        defaultColumn: "overview",
        screener_type: "crypto_mkt",
        displayCurrency: "USD",
        colorTheme: "dark",
        locale: "en",
      });

      widgetContainer.appendChild(script);
    }
  }, []);

  return (
    <div className="tradingview-widget-container h-[550px] w-screen px-10 py-20">
      <div
        id="tradingview-crypto-market-widget"
        className="h-full w-full"
      ></div>
      <div className="tradingview-widget-copyright"></div>
    </div>
  );
};

export default CryptoMarket;
