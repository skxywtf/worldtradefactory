"use client";
import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

const EconomicCalendar: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const container = containerRef.current;

    if (container && !container.querySelector("script")) {
      container.innerHTML = ""; // Clear previous content

      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-events.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "colorTheme": "${theme === 'dark' ? 'dark' : 'light'}",
          "isTransparent": false,
          "width": "400",
          "height": "550",
          "locale": "en",
          "largeChartUrl": "http://localhost:3000",
          "importanceFilter": "-1,0,1",
          "countryFilter": "ar,au,br,ca,cn,fr,de,in,id,it,jp,kr,mx,ru,sa,za,tr,gb,us,eu"
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
  }, [theme]);

  return (
    <div className="tradingview-widget-container py-10" ref={containerRef}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export default EconomicCalendar;
