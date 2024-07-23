import React, { useEffect, useRef } from "react";

const FundamentalData: React.FC = () => {
  // Use type assertion to specify the ref is for an HTMLDivElement or null
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (container && !container.querySelector("script")) {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-financials.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        isTransparent: false,
        largeChartUrl: "",
        displayMode: "regular",
        width: "100%",
        height: "100%",
        colorTheme: "dark",
        symbol: "NASDAQ:AAPL",
        locale: "en"
      });

      // Append script to container after a delay to ensure DOM is fully ready
      const timeoutId = setTimeout(() => {
        container.appendChild(script);
      }, 100);

      // Clear the timeout if component unmounts before script is appended
      return () => {
        clearTimeout(timeoutId);
        const existingScript = container.querySelector("script");
        if (existingScript) {
          container.removeChild(existingScript);
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

export default FundamentalData;
