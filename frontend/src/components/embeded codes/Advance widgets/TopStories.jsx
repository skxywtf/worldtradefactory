import React, { useEffect, useRef } from "react";

const TopStories = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (container && !container.querySelector("script")) {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "feedMode": "all_symbols",
          "isTransparent": false,
          "displayMode": "adaptive",
          "width": 400,
          "height": 550,
          "colorTheme": "dark",
          "locale": "en"
        }`;

      // Append script to container after a delay to ensure DOM is fully ready
      const timeoutId = setTimeout(() => {
        container.appendChild(script);
      }, 100);

      // Clear the timeout if component unmounts before script is appended
      return () => {
        clearTimeout(timeoutId);
        if (container && container.querySelector("script")) {
          container.removeChild(container.querySelector("script"));
        }
      };
    }
  }, []);

  return (
    <div className="tradingview-widget-container py-10" ref={containerRef}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright"></div>
    </div>
  );
};

export default TopStories;
