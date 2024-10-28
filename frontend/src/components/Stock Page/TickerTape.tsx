import React, { useEffect, useRef } from 'react';
import { useTheme } from "next-themes";

const TickerTape: React.FC<{ onSymbolChange: (symbol: string) => void }> = ({ onSymbolChange }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        if (containerRef.current) {
            const script = document.createElement('script');
            script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
            script.type = 'text/javascript';
            script.async = true;
            script.innerHTML = JSON.stringify({
                symbols: [
                    { description: "", proName: "NASDAQ:TSLA" },
                    { description: "", proName: "NASDAQ:AAPL" },
                    { description: "", proName: "NASDAQ:NVDA" },
                    { description: "", proName: "NASDAQ:MSFT" },
                    { description: "", proName: "NASDAQ:AMZN" },
                    { description: "", proName: "NASDAQ:GOOGL" },
                    { description: "", proName: "NASDAQ:META" },
                    { description: "", proName: "NYSE:BRK.B" },
                    { description: "", proName: "NYSE:LLY" },
                    { description: "", proName: "NYSE:UNH" },
                    { description: "", proName: "NYSE:V" },
                    { description: "", proName: "NYSE:WMT" }
                ],
                showSymbolLogo: true,
                colorTheme: theme === "dark" ? "dark" : "light",
                isTransparent: false,
                displayMode: "adaptive",
                locale: "en",
                largeChartUrl: "http://localhost:3000/main/stock",
            });

            containerRef.current.innerHTML = '';
            containerRef.current.appendChild(script);

            script.onload = () => {
                window.addEventListener('message', (event) => {
                    if (event.data && event.data.symbol) {
                        onSymbolChange(event.data.symbol);
                    }
                });
            };
        }

        return () => {
            if (containerRef.current) {
                containerRef.current.innerHTML = '';
            }
        };
    }, [onSymbolChange, theme]);

    return <div id="ticker-tape" ref={containerRef}></div>;
};

export default TickerTape;