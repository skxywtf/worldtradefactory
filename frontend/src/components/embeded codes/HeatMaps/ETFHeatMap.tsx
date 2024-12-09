// import React, { useEffect, useRef } from "react";

// const ETFHeatMap: React.FC = () => {
//   const container = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     if (container.current && !container.current.querySelector("script")) {
//       // Check if the script is already added
//       const script = document.createElement("script");
//       script.src =
//         "https://s3.tradingview.com/external-embedding/embed-widget-etf-heatmap.js";
//       script.type = "text/javascript";
//       script.async = true;
//       script.innerHTML = `
//         {
//           "dataSource": "AllUSEtf",
//           "blockSize": "aum",
//           "blockColor": "change",
//           "grouping": "asset_class",
//           "locale": "en",
//           "symbolUrl": "",
//           "colorTheme": "dark",
//           "hasTopBar": false,
//           "isDataSetEnabled": false,
//           "isZoomEnabled": true,
//           "hasSymbolTooltip": true,
//           "isMonoSize": false,
//           "width": "100%",
//           "height": "100%"
//         }`;
//       container.current.appendChild(script);
//     }
//   }, []);

//   return (
//     <div
//       className="tradingview-widget-container fixed top-0 left-0 h-[550px] w-full px-10 py-20 overflow-auto"
//       ref={container}
//     >
//       <div className="tradingview-widget-container__widget"></div>
//       <div className="tradingview-widget-copyright"></div>
//     </div>
//   );
// }

// export default ETFHeatMap;
// above one is earlier one


"use client";
import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

const ETFHeatMap: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const container = containerRef.current;

    if (container && !container.querySelector("script")) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-etf-heatmap.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "dataSource": "AllUSEtf",
          "blockSize": "aum",
          "blockColor": "change",
          "grouping": "asset_class",
          "locale": "en",
          "symbolUrl": "",
          "colorTheme": "${theme === 'dark' ? 'dark' : 'light'}",
          "hasTopBar": true,
          "isDataSetEnabled": true,
          "isZoomEnabled": true,
          "hasSymbolTooltip": true,
          "isMonoSize": false,
          "width": "100%",
          "height": "100%"
        }`;

      container.appendChild(script);
    }

    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [theme]);

  return (
    <div className="tradingview-widget-container" ref={containerRef}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export default ETFHeatMap;
