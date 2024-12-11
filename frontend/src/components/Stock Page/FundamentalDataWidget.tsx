"use client";

import React, { useEffect, useRef } from 'react';
import { useTheme } from "next-themes";

interface FundamentalDataWidgetProps {
  searchInputValue?: string;
}

const FundamentalDataWidget: React.FC<FundamentalDataWidgetProps> = ({ searchInputValue }) => {
  const { theme } = useTheme();
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
        largeChartUrl: "http://localhost:3000/main/stock",
        displayMode: "regular",
        width: "100%",
        height: "100%",
        colorTheme: theme === "dark" ? "dark" : "light", // Set to dark theme
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
  }, [typedInput, theme]); // Update whenever the symbol changes

  return (
    <div className="tradingview-widget-container" ref={containerRef} style={{ height: '100%', width: '100%' }}>
      {/* The widget will be injected here */}
    </div>
  );
};

export default FundamentalDataWidget;
