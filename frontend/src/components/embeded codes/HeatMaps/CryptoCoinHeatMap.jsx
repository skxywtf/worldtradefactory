import React, { useEffect, useRef } from "react";

function CryptoCoinHeatMap() {
  const container = useRef(null);

  useEffect(() => {
    if (!container.current.querySelector("script")) {
      // Check if the script is already added
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-crypto-coins-heatmap.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
          {
            "dataSource": "Crypto",
            "blockSize": "market_cap_calc",
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
      container.current.appendChild(script);
    }
  }, []);

  return (
    <div className="tradingview-widget-container " ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright"></div>
    </div>
  );
}

export default CryptoCoinHeatMap;
