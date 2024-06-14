import React, { useEffect } from "react";

const ForexCrossRates = () => {
  useEffect(() => {
    const widgetContainer = document.getElementById("tradingview-widget");

    if (widgetContainer.childNodes.length === 0) {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js";
      script.async = true;
      script.innerHTML = JSON.stringify({
        width: "100%",
        height: "100%",
        currencies: ["EUR", "USD", "JPY", "GBP", "CHF", "AUD", "CAD", "NZD"],
        isTransparent: false,
        colorTheme: "dark",
        locale: "en",
        backgroundColor: "#000000",
      });

      widgetContainer.appendChild(script);
    }
  }, []);

  return (
    <div className="h-full md:h-screen w-screen px-10">
      <div className="tradingview-widget-container sm:h-1/2 w-full  ">
        <div id="tradingview-widget" className="h-full w-full"></div>
        <div className="tradingview-widget-copyright"></div>
      </div>
    </div>
  );
};

export default ForexCrossRates;
