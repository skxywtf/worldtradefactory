"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface SymbolInfoProps {
  searchInputValue?: string;
}

const SymbolInfo: React.FC<SymbolInfoProps> = ({ searchInputValue }) => {
  const navigate = useRouter();
  const typedInput = searchInputValue || "AAPL";

  useEffect(() => {
    const widgetContainer = document.getElementById(
      "tradingview-symbol-info-widget"
    ) as HTMLDivElement | null;

    if (widgetContainer) {
      // Remove any existing widget
      widgetContainer.innerHTML = "";

      const createScript = () => {
        const script = document.createElement("script");
        script.src =
          "https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js";
        script.async = true;
        script.innerHTML = JSON.stringify({
          symbol: typedInput,
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
        if (widgetContainer) {
          widgetContainer.innerHTML = "";
        }
      };
    }
  }, [searchInputValue, typedInput]);

  const handleWidgetClick = () => {
    navigate.replace("/stock");
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
