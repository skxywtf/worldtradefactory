
// "use client";
// import React, { useEffect, useRef } from 'react';
// import { useSymbol } from './SymbolContext'; // Import the context to get the symbol

// const TopStoriesWidget: React.FC = () => {
//     const { symbol } = useSymbol(); // Get the current symbol from context
//     const containerRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         if (containerRef.current) {
//             // Remove existing script if it exists
//             const existingScript = containerRef.current.querySelector('script[src="https://s3.tradingview.com/external-embedding/embed-widget-timeline.js"]');
//             if (existingScript) {
//                 containerRef.current.removeChild(existingScript);
//             }

//             // Create and add new script
//             const script = document.createElement('script');
//             script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-timeline.js';
//             script.type = 'text/javascript';
//             script.async = true;
//             script.innerHTML = JSON.stringify({
//                 feedMode: 'all',
//                 width: '100%',
//                 height: '100%',
//                 colorTheme: 'light',
//                 isTransparent: true,
//                 symbol: symbol, // Use dynamic symbol
//                 locale: 'en'
//             });

//             containerRef.current.innerHTML = ''; // Clear previous content
//             containerRef.current.appendChild(script);
//         }

//         // Cleanup function to remove the script
//         return () => {
//             if (containerRef.current) {
//                 containerRef.current.innerHTML = '';
//             }
//         };
//     }, [symbol]); // Update whenever the symbol changes

//     return <div id="top-stories" ref={containerRef} style={{ height: '425px' }}></div>;
// };

// export default TopStoriesWidget;


"use client";
import React, { useEffect, useRef } from 'react';

interface TopStoriesWidgetProps {
  searchInputValue?: string;
}

const TopStoriesWidget: React.FC<TopStoriesWidgetProps> = ({ searchInputValue }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const typedInput = searchInputValue || "AAPL"; // Default to "AAPL" if no input is provided

  useEffect(() => {
    if (containerRef.current) {
      // Remove existing script if it exists
      const existingScript = containerRef.current.querySelector('script[src="https://s3.tradingview.com/external-embedding/embed-widget-timeline.js"]');
      if (existingScript) {
        containerRef.current.removeChild(existingScript);
      }

      // Create and add new script
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-timeline.js';
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = JSON.stringify({
        feedMode: 'all',
        width: '100%',
        height: '100%',
        colorTheme: 'dark', // Set to dark theme
        isTransparent: false,
        symbol: typedInput, // Use dynamic symbol
        locale: 'en'
      });

      containerRef.current.innerHTML = ''; // Clear previous content
      containerRef.current.appendChild(script);
    }

    // Cleanup function to remove the script
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [typedInput]); // Update whenever the symbol changes

  return <div id="top-stories" ref={containerRef} style={{ height: '425px' }}></div>;
};

export default TopStoriesWidget;
