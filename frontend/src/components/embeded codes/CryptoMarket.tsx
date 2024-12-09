// "use client";
// import React, { useEffect } from "react";
// import { useTheme } from "next-themes";
// const CryptoMarket: React.FC = () => {
//   const { theme } = useTheme();
//   useEffect(() => {
//     const widgetContainer = document.getElementById(
//       "tradingview-crypto-market-widget"
//     ) as HTMLDivElement | null;

//     if (widgetContainer && widgetContainer.childNodes.length === 0) {
//       const script = document.createElement("script");
//       script.src =
//         "https://s3.tradingview.com/external-embedding/embed-widget-screener.js";
//       script.async = true;
//       script.innerHTML = JSON.stringify({
//         width: "100%",
//         height: "100%",
//         defaultColumn: "overview",
//         screener_type: "crypto_mkt",
//         displayCurrency: "USD",
//         colorTheme: theme === "dark" ? "dark" : "light", 
//         // colorTheme: "dark",
//         locale: "en"
//         // isTransparent: "false"
//       });

//       widgetContainer.appendChild(script);
//     }
//   }, [theme]);

//   return (
//     <div className="tradingview-widget-container h-screen w-[100%] ">
//       <div
//         id="tradingview-crypto-market-widget"
//         className="h-full w-full"
        
//       ></div>
//       <div className="tradingview-widget-copyright"></div>
//     </div>
//   );
// };

// export default CryptoMarket;

"use client";
import React, { useEffect } from "react";
import { useTheme } from "next-themes";

const CryptoMarket: React.FC = () => {
  const { theme } = useTheme(); // Access the current theme

  useEffect(() => {
    const widgetContainer = document.getElementById(
      "tradingview-crypto-market-widget"
    ) as HTMLDivElement | null;

    // Clear existing child nodes if theme changes to avoid duplication
    if (widgetContainer) {
      widgetContainer.innerHTML = "";

      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-screener.js";
      script.async = true;
      script.innerHTML = JSON.stringify({
        width: "100%",
        height: "100%",
        defaultColumn: "overview",
        screener_type: "crypto_mkt",
        displayCurrency: "USD",
        colorTheme: theme === "dark" ? "dark" : "light", // Dynamically set theme
        locale: "en",
      });

      widgetContainer.appendChild(script);
    }
  }, [theme]); // Re-run effect whenever the theme changes

  return (
    <div className="tradingview-widget-container h-screen w-full">
      <div id="tradingview-crypto-market-widget" className="h-full w-full"></div>
      <div className="tradingview-widget-copyright">
        {/* Optional: Add attribution or copyright info */}
      </div>
    </div>
  );
};

export default CryptoMarket;
