import React, { useEffect, useRef } from "react";

const MiniChart: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (container && !container.querySelector("script")) {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "symbol": "FX:EURUSD",
          "width": 350,
          "height": 220,
          "locale": "en",
          "dateRange": "12M",
          "colorTheme": "dark",
          "isTransparent": false,
          "autosize": false,
          "largeChartUrl": ""
        }`;

      // Append script to container after a delay to ensure DOM is fully ready
      const timeoutId = setTimeout(() => {
        container.appendChild(script);
      }, 100);

      // Clear the timeout if component unmounts before script is appended
      return () => {
        clearTimeout(timeoutId);
        if (container) {
          const scriptElement = container.querySelector("script");
          if (scriptElement) {
            container.removeChild(scriptElement);
          }
        }
      };
    }
  }, []);

  return (
    <div className="tradingview-widget-container" ref={containerRef}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright"></div>
    </div>
  );
};

export default MiniChart;
