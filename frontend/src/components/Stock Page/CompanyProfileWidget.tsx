
// import React, { useEffect, useRef } from 'react';
// import { useSymbol } from './SymbolContext';

// const CompanyProfileWidget: React.FC = () => {
//     const { symbol } = useSymbol();
//     const containerRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         if (containerRef.current) {
//             // Clear the container
//             containerRef.current.innerHTML = '';

//             // Create and add new script
//             const script = document.createElement('script');
//             script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-profile.js';
//             script.type = 'text/javascript';
//             script.async = true;
//             script.innerHTML = JSON.stringify({
//                 width: '100%',
//                 height: '100%',
//                 isTransparent: false,
//                 colorTheme: 'light',
//                 symbol: symbol,
//                 locale: 'en'
//             });

//             containerRef.current.appendChild(script);
//         }

//         return () => {
//             if (containerRef.current) {
//                 containerRef.current.innerHTML = '';
//             }
//         };
//     }, [symbol]);

//     return (
//         <div className="tradingview-widget-container" ref={containerRef} style={{ height: '100%', width: '100%' }}>
//             <div className="tradingview-widget-container__widget"></div>
//         </div>
//     );
// };

// export default CompanyProfileWidget;

"use client";

import React, { useEffect, useRef } from 'react';
import { useTheme } from "next-themes";

interface CompanyProfileWidgetProps {
  searchInputValue?: string;
}

const CompanyProfileWidget: React.FC<CompanyProfileWidgetProps> = ({ searchInputValue }) => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const typedInput = searchInputValue || "AAPL"; // Default to "AAPL" if no input is provided

  useEffect(() => {
    if (containerRef.current) {
      // Clear the container
      containerRef.current.innerHTML = '';

      // Create and add new script
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-profile.js';
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = JSON.stringify({
        width: '100%',
        height: '100%',
        isTransparent: false,
        colorTheme: theme === "dark" ? "dark" : "light", // Set to dark theme
        largeChartUrl: "http://localhost:3000/main/stock",
        symbol: typedInput, // Use dynamic symbol
        locale: 'en'
      });

      containerRef.current.appendChild(script);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [typedInput, theme]); // Update whenever the symbol changes

  return (
    <div className="tradingview-widget-container" ref={containerRef} style={{ height: '100%', width: '100%' }}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export default CompanyProfileWidget;
