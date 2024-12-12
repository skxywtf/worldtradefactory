"use client";

import React, { useEffect, useRef } from 'react';
import { useTheme } from "next-themes";

interface SymbolInfoProps {
  searchInputValue?: string;
}

const Symbolinfo: React.FC<SymbolInfoProps> = ({ searchInputValue }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const typedInput = searchInputValue || "AAPL"; // Default to "AAPL" if no input is provided
  const { theme } = useTheme();

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      // Clear previous widget content
      container.innerHTML = '';

      // Create and add new script
      const script = document.createElement('script');
      script.id = 'tradingview-widget-symbol-info-script';
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js';
      script.async = true;
      script.innerHTML = JSON.stringify({
        symbol: typedInput, // Use dynamic symbol
        width: "100%",
        locale: "en",
        colorTheme: theme === "dark" ? "dark" : "light", // Set to dark theme
        isTransparent: false,
        height: 185,
        largeChartUrl: `http://localhost:3000/main/stock?symbol=${typedInput}` // Redirect to your custom path
      });

      container.appendChild(script);
    }

    // Cleanup function to remove the script
    return () => {
      const existingScript = document.getElementById('tradingview-widget-symbol-info-script');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [typedInput, theme]); // Update whenever the symbol changes

  return (
    <div className="tradingview-widget-container">
      <div ref={containerRef}></div>
      <div className="tradingview-widget-copyright">
      </div>
    </div>
  );
};

export default Symbolinfo;
