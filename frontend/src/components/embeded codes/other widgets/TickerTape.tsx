"use client";
import React, { useEffect, useRef } from "react";

const TickerTape: React.FC = () => {
  // Type the ref to be either HTMLDivElement or null
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (container && !container.querySelector("script")) {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        symbols: [
          {
            proName: "FOREXCOM:SPXUSD",
            title: "S&P 500 Index"
          },
          {
            proName: "FOREXCOM:NSXUSD",
            title: "US 100 Cash CFD"
          },
          {
            proName: "FX_IDC:EURUSD",
            title: "EUR to USD"
          },
          {
            proName: "BITSTAMP:BTCUSD",
            title: "Bitcoin"
          },
          {
            proName: "BITSTAMP:ETHUSD",
            title: "Ethereum"
          }
        ],
        showSymbolLogo: true,
        isTransparent: false,
        displayMode: "adaptive",
        colorTheme: "dark",
        locale: "en"
      });

      // Append script to container after a delay to ensure DOM is fully ready
      const timeoutId = setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.appendChild(script);
        }
      }, 100);

      // Clear the timeout if component unmounts before script is appended
      return () => {
        clearTimeout(timeoutId);
        if (container && container.querySelector("script")) {
          container.removeChild(container.querySelector("script") as HTMLScriptElement);
        }
      };
    }
  }, []);

  return (
    <div className="w-full">
      <div className="tradingview-widget-container w-full" ref={containerRef}>
        <div className="tradingview-widget-container__widget"></div>
        <div className="tradingview-widget-copyright"></div>
      </div>
    </div>
  );
};

export default TickerTape;
