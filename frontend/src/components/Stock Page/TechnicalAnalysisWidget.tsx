"use client";
import React, { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

interface TechnicalAnalysisWidgetProps {
  searchInputValue?: string;
}

const TechnicalAnalysisWidget: React.FC<TechnicalAnalysisWidgetProps> = ({ searchInputValue }) => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const typedInput = searchInputValue || "AAPL"; // Default to "AAPL" if no input is provided

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      // Clear previous widget content
      container.innerHTML = '';

      // Create and add new script
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js';
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = JSON.stringify({
        interval: "1m",
        width: "100%",
        isTransparent: false,
        height: 450,
        symbol: typedInput, // Use dynamic symbol
        showIntervalTabs: true,
        displayMode: "single",
        locale: "en",
        colorTheme: theme === "dark" ? "dark" : "light", // Ensure dark theme
        largeChartUrl: "http://localhost:3000/main/stock"
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
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
};

export default TechnicalAnalysisWidget;
