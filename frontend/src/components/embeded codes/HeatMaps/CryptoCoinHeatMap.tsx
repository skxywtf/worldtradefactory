"use client";
import React, { useEffect, useRef } from "react";

const CryptoCoinHeatMap: React.FC = () => {
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const addScript = () => {
      if (container.current && container.current.querySelector("script")) {
        return; // Exit if the script already exists
      }

      if (container.current) {
        const script = document.createElement("script");
        script.src =
          "https://s3.tradingview.com/external-embedding/embed-widget-crypto-coins-heatmap.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = JSON.stringify({
          dataSource: "Crypto",
          blockSize: "market_cap_calc",
          blockColor: "change",
          locale: "en",
          symbolUrl: "",
          colorTheme: "dark",
          hasTopBar: false,
          isDataSetEnabled: false,
          isZoomEnabled: true,
          hasSymbolTooltip: true,
          isMonoSize: false,
          width: "100%",
          height: "100%",
        });

        container.current.appendChild(script);
      }
    };

    // Using setTimeout to delay the script execution
    const timeoutId = setTimeout(addScript, 1000); // Delay script execution by 1 second

    // Cleanup function to remove the script on component unmount
    return () => {
      clearTimeout(timeoutId); // Clear the timeout if the component unmounts
      if (container.current) {
        container.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div
      className="tradingview-widget-container h-screen w-screen"
      ref={container}
    >
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
}

export default CryptoCoinHeatMap;
