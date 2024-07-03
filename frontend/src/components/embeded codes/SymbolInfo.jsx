import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SymbolInfo = ({ searchInputValue }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const widgetContainer = document.getElementById(
      "tradingview-symbol-info-widget"
    );

    // Remove any existing widget
    widgetContainer.innerHTML = "";

    const createScript = () => {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js";
      script.async = true;
      script.innerHTML = JSON.stringify({
        symbol: searchInputValue,
        locale: "en",
        colorTheme: "dark",
        isTransparent: false,
      });

      widgetContainer.appendChild(script);
    };

    const timeoutId = setTimeout(() => {
      createScript();
    }, 0); // Run the createScript function in the next event loop iteration

    return () => {
      clearTimeout(timeoutId);
      // Clean up script when component unmounts
      widgetContainer.innerHTML = "";
    };
  }, [searchInputValue]);

  const handleWidgetClick = () => {
    navigate("/stock");
  };

  return (
    <div className="tradingview-widget-container w-full h-full relative">
      <div id="tradingview-symbol-info-widget" className="h-full w-full"></div>
      <div
        className="absolute top-0 left-0 w-full h-full"
        onClick={handleWidgetClick}
        style={{ cursor: "pointer" }}
      ></div>
    </div>
  );
};

export default SymbolInfo;
