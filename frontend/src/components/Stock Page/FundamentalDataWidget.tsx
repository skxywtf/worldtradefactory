// import React, { useEffect, useRef } from 'react';
// import { useSymbol } from './SymbolContext';

// const FundamentalDataWidget: React.FC = () => {
//     const { symbol } = useSymbol(); // Get the current symbol from context
//     const containerRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         const container = containerRef.current;

//         if (container) {
//             // Clear previous widget output
//             container.innerHTML = '';

//             // Create and add new script
//             const script = document.createElement('script');
//             script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-financials.js';
//             script.type = 'text/javascript';
//             script.async = true;
//             script.innerHTML = JSON.stringify({
//                 isTransparent: false,
//                 largeChartUrl: "",
//                 displayMode: "regular",
//                 width: "100%",
//                 height: "100%",
//                 colorTheme: "light",
//                 symbol: symbol, // Use dynamic symbol
//                 locale: "en"
//             });

//             container.appendChild(script);
//         }

//         // Cleanup function to remove the script
//         return () => {
//             const container = containerRef.current;
//             if (container) {
//                 container.innerHTML = ''; // Clear the container content
//             }
//         };
//     }, [symbol]); // Update whenever the symbol changes

//     return (
//         <div className="tradingview-widget-container" ref={containerRef} style={{ height: '100%', width: '100%' }}>
//             {/* The widget will be injected here */}
//         </div>
//     );
// };

// export default FundamentalDataWidget;


"use client";

import React, { useEffect, useRef } from 'react';

interface FundamentalDataWidgetProps {
  searchInputValue?: string;
}

const FundamentalDataWidget: React.FC<FundamentalDataWidgetProps> = ({ searchInputValue }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const typedInput = searchInputValue || "AAPL"; // Default to "AAPL" if no input is provided

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      // Clear previous widget output
      container.innerHTML = '';

      // Create and add new script
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-financials.js';
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = JSON.stringify({
        isTransparent: false,
        largeChartUrl: "",
        displayMode: "regular",
        width: "100%",
        height: "100%",
        colorTheme: "dark", // Set to dark theme
        symbol: typedInput, // Use dynamic symbol
        locale: "en"
      });

      container.appendChild(script);
    }

    // Cleanup function to remove the script
    return () => {
      const container = containerRef.current;
      if (container) {
        container.innerHTML = ''; // Clear the container content
      }
    };
  }, [typedInput]); // Update whenever the symbol changes

  return (
    <div className="tradingview-widget-container" ref={containerRef} style={{ height: '100%', width: '100%' }}>
      {/* The widget will be injected here */}
    </div>
  );
};

export default FundamentalDataWidget;
