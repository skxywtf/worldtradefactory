import React, { useEffect, useRef } from 'react';

interface TradingViewWidgetProps {
    symbol: string;
}

const TradingViewWidget: React.FC<TradingViewWidgetProps> = ({ symbol }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            // Create and configure the script element
            const script = document.createElement('script');
            script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
            script.type = 'text/javascript';
            script.async = true;
            script.innerHTML = JSON.stringify({
                autosize: true,
                symbol: symbol,
                interval: 'D',
                timezone: 'Etc/UTC',
                theme: 'dark',
                style: '1',
                locale: 'en',
                hide_side_toolbar: false,
                allow_symbol_change: true,
                studies: ['STD;MACD'],
                largeChartUrl: "http://localhost:3000/main/stock",
                container_id: 'tradingview_chart'
            });

            // Clear any existing content and append the new script
            containerRef.current.innerHTML = '';
            containerRef.current.appendChild(script);
        }

        // Cleanup function to remove the script
        return () => {
            if (containerRef.current) {
                containerRef.current.innerHTML = '';
            }
        };
    }, [symbol]);

    return <div id="tradingview_chart" ref={containerRef} style={{ height: '500px' }}></div>;
};

export default TradingViewWidget;
