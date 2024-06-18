import { useEffect, useRef } from "react";

function StockHeatMap() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (container && !container.querySelector("script")) {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js";
      script.type = "text/javascript";
      script.async = true;
      container.appendChild(script);
      script.innerHTML = `
        {
          "exchanges": [],
          "dataSource": "SPX500",
          "grouping": "sector",
          "blockSize": "market_cap_basic",
          "blockColor": "change",
          "locale": "en",
          "symbolUrl": "",
          "colorTheme": "dark",
          "hasTopBar": false,
          "isDataSetEnabled": false,
          "isZoomEnabled": true,
          "hasSymbolTooltip": true,
          "isMonoSize": false,
          "width": "100%",
          "height": "100%"
        }`;
      container.appendChild(script);
      console.log("Script appended successfully");
    } else {
      console.log("Script already exists, skipping append");
    }

    return () => {
      // Cleanup script if it exists
      if (container && container.querySelector("script")) {
        container.removeChild(container.querySelector("script"));
        console.log("Script removed on unmount");
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container w-full" ref={containerRef}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright"></div>
    </div>
  );
}

export default StockHeatMap;
