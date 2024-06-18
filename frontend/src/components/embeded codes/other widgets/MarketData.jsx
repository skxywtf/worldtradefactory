import React, { useEffect, useRef } from "react";

const MarketData = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (container && !container.querySelector("script")) {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "width": "100%",
          "height": "100%",
          "symbolsGroups": [
            {
              "name": "Indices",
              "originalName": "Indices",
              "symbols": [
                {
                  "name": "FOREXCOM:SPXUSD",
                  "displayName": "S&P 500 Index"
                },
                {
                  "name": "FOREXCOM:NSXUSD",
                  "displayName": "US 100 Cash CFD"
                },
                {
                  "name": "FOREXCOM:DJI",
                  "displayName": "Dow Jones Industrial Average Index"
                },
                {
                  "name": "INDEX:NKY",
                  "displayName": "Nikkei 225"
                },
                {
                  "name": "INDEX:DEU40",
                  "displayName": "DAX Index"
                },
                {
                  "name": "FOREXCOM:UKXGBP",
                  "displayName": "FTSE 100 Index"
                }
              ]
            },
            {
              "name": "Futures",
              "originalName": "Futures",
              "symbols": [
                {
                  "name": "CME_MINI:ES1!",
                  "displayName": "S&P 500"
                },
                {
                  "name": "CME:6E1!",
                  "displayName": "Euro"
                },
                {
                  "name": "COMEX:GC1!",
                  "displayName": "Gold"
                },
                {
                  "name": "NYMEX:CL1!",
                  "displayName": "WTI Crude Oil"
                },
                {
                  "name": "NYMEX:NG1!",
                  "displayName": "Gas"
                },
                {
                  "name": "CBOT:ZC1!",
                  "displayName": "Corn"
                }
              ]
            },
            {
              "name": "Bonds",
              "originalName": "Bonds",
              "symbols": [
                {
                  "name": "CBOT:ZB1!",
                  "displayName": "T-Bond"
                },
                {
                  "name": "CBOT:UB1!",
                  "displayName": "Ultra T-Bond"
                },
                {
                  "name": "EUREX:FGBL1!",
                  "displayName": "Euro Bund"
                },
                {
                  "name": "EUREX:FBTP1!",
                  "displayName": "Euro BTP"
                },
                {
                  "name": "EUREX:FGBM1!",
                  "displayName": "Euro BOBL"
                }
              ]
            },
            {
              "name": "Forex",
              "originalName": "Forex",
              "symbols": [
                {
                  "name": "FX:EURUSD",
                  "displayName": "EUR to USD"
                },
                {
                  "name": "FX:GBPUSD",
                  "displayName": "GBP to USD"
                },
                {
                  "name": "FX:USDJPY",
                  "displayName": "USD to JPY"
                },
                {
                  "name": "FX:USDCHF",
                  "displayName": "USD to CHF"
                },
                {
                  "name": "FX:AUDUSD",
                  "displayName": "AUD to USD"
                },
                {
                  "name": "FX:USDCAD",
                  "displayName": "USD to CAD"
                }
              ]
            },
            {
              "name": "Add tab",
              "symbols": []
            }
          ],
          "showSymbolLogo": true,
          "isTransparent": false,
          "colorTheme": "dark",
          "locale": "en",
          "backgroundColor": "#131722"
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
    <div className=" h-screen w-screen">
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

export default MarketData;
