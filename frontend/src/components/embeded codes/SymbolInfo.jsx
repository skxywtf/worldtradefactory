import React, { useEffect } from "react";

const SymbolInfo = () => {
  useEffect(() => {
    const widgetContainer = document.getElementById(
      "tradingview-symbol-info-widget"
    );

    if (widgetContainer.childNodes.length === 0) {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js";
      script.async = true;
      script.innerHTML = JSON.stringify({
        symbol: "NASDAQ:AAPL",
        width: "100%",
        locale: "en",
        colorTheme: "dark",
        isTransparent: false,
      });

      widgetContainer.appendChild(script);
    }
  }, []);

  return (
    <div className="tradingview-widget-container w-full">
      <div id="tradingview-symbol-info-widget" className="h-full w-full"></div>
      <div className="tradingview-widget-copyright"></div>
    </div>
  );
};

export default SymbolInfo;
