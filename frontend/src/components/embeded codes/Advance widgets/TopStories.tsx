"use client";
import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

const TopStories: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme(); // Use theme from next-themes

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      container.innerHTML = ""; // Clear previous widget content

      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "feedMode": "all_symbols",
          "isTransparent": false,
          "largeChartUrl": "http://localhost:3000",
          "displayMode": "adaptive",
          "width": 400,
          "height": 550,
          "colorTheme": "${theme === 'dark' ? 'dark' : 'light'}",
          "locale": "en"
        }`;

      const timeoutId = setTimeout(() => {
        container.appendChild(script);
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        if (container) {
          container.innerHTML = "";
        }
      };
    }
  }, [theme]); // Re-run effect when theme changes

  return (
    <div className="tradingview-widget-container py-10" ref={containerRef}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export default TopStories;
