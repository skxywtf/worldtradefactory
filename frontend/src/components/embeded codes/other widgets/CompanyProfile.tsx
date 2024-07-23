"use client";
import React, { useEffect, useRef, useState } from "react";

const CompanyProfile: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  
  // Retrieve the saved symbol and theme from localStorage
  const [symbol, setSymbol] = useState<string>(() => {
    return localStorage.getItem("searchSymbol") || "NASDAQ:AAPL";
  });
  
  const [currentTheme, setCurrentTheme] = useState<string>(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    const searchInput = localStorage.getItem("searchInput");
    if (searchInput) {
      setSymbol(searchInput);
      localStorage.setItem("searchSymbol", searchInput);
    }
  }, []);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      const newTheme = theme ? "dark" : "light";
      setCurrentTheme(newTheme);
      localStorage.setItem("theme", newTheme);
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;

    const cleanUp = () => {
      if (scriptRef.current && scriptRef.current.parentElement === container) {
        container?.removeChild(scriptRef.current);
        scriptRef.current = null;
      }
    };

    const createScript = () => {
      cleanUp(); // Clean up previous script

      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-symbol-profile.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        width: "100%",
        height: "100%",
        isTransparent: false,
        colorTheme: currentTheme,
        symbol: symbol,
        locale: "en"
      });

      container?.appendChild(script);
      scriptRef.current = script;
    };

    const timeoutId = setTimeout(() => {
      createScript();
    }, 0); // Run the createScript function in the next event loop iteration

    return () => {
      clearTimeout(timeoutId);
      cleanUp();
    };
  }, [symbol, currentTheme]); // Recreate the script when symbol or currentTheme changes

  return (
    <div className="h-screen w-screen">
      <div
        className="tradingview-widget-container h-full w-full px-5 py-20"
        ref={containerRef}
      >
        <div className="tradingview-widget-container__widget"></div>
        <div className="tradingview-widget-copyright"></div>
      </div>
    </div>
  );
};

export default CompanyProfile;
