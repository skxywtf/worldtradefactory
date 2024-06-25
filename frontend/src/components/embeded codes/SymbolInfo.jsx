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
        // width: "100%",
        locale: "en",
        colorTheme: "dark",
        isTransparent: false,
        // Add onClick event listener to navigate to "/stock"
        onWidgetClick: () => {
          navigate("/stock");
          return false; // Prevent default behavior
        },
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

  return (
    <div className="tradingview-widget-container w-full">
      <div id="tradingview-symbol-info-widget" className="h-full w-full"></div>
      <div className="tradingview-widget-copyright"></div>
    </div>
  );
};

export default SymbolInfo;
