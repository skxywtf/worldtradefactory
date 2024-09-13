// import React, { useEffect } from 'react';
// import { useSymbol } from './SymbolContext';

// const Symbolinfo: React.FC = () => {
//     const { symbol } = useSymbol();

//     useEffect(() => {
//         const container = document.getElementById('symbol-info-widget');
        
//         if (container) {
//             container.innerHTML = ''; // Clear the container before appending the script

//             const script = document.createElement('script');
//             script.id = 'tradingview-widget-symbol-info-script';
//             script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js';
//             script.async = true;
//             script.innerHTML = JSON.stringify({
//                 "symbol": symbol,
//                 "width": "100%",
//                 "locale": "en",
//                 "colorTheme": "light",
//                 "isTransparent": true,
//                 "height": 175
//             });

//             container.appendChild(script);
//         }

//         return () => {
//             const existingScript = document.getElementById('tradingview-widget-symbol-info-script');
//             if (existingScript) {
//                 existingScript.remove();
//             }
//         };
//     }, [symbol]);

//     return (
//         <div className="tradingview-widget-container">
//             <div id="symbol-info-widget"></div>
//             <div className="tradingview-widget-copyright">
//                 <a href="https://www.tradingview.com" rel="noopener noreferrer" target="_blank">
//                     <span className="blue-text">Track all markets on TradingView</span>
//                 </a>
//             </div>
//         </div>
//     );
// };

// export default Symbolinfo;

 "use client";
// USE THIS FOR DEFAULT
// import React, { useEffect, useRef } from 'react';

// interface SymbolInfoProps {
//   searchInputValue?: string;
// }

// const Symbolinfo: React.FC<SymbolInfoProps> = ({ searchInputValue }) => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const typedInput = searchInputValue || "AAPL"; // Default to "AAPL" if no input is provided

//   useEffect(() => {
//     const container = containerRef.current;

//     if (container) {
//       // Clear previous widget content
//       container.innerHTML = '';

//       // Create and add new script
//       const script = document.createElement('script');
//       script.id = 'tradingview-widget-symbol-info-script';
//       script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js';
//       script.async = true;
//       script.innerHTML = JSON.stringify({
//         symbol: typedInput, // Use dynamic symbol
//         width: "100%",
//         locale: "en",
//         colorTheme: "dark", // Set to dark theme
//         isTransparent: false,
//         height: 185,
//         largeChartUrl: "http://localhost:3000/main/stock,"
//       });

//       container.appendChild(script);
//     }

//     // Cleanup function to remove the script
//     return () => {
//       const existingScript = document.getElementById('tradingview-widget-symbol-info-script');
//       if (existingScript) {
//         existingScript.remove();
//       }
//     };
//   }, [typedInput]); // Update whenever the symbol changes

//   return (
//     <div className="tradingview-widget-container">
//       <div ref={containerRef}></div>
//       <div className="tradingview-widget-copyright">
//         {/* <a href="https://www.tradingview.com" rel="noopener noreferrer" target="_blank">
//           <span className="blue-text">Track all markets on TradingView</span>
//         </a> */}
//       </div>
//     </div>
//   );
// };

// export default Symbolinfo;
// trying for redirecting
// "use client";

// import React, { useEffect, useRef } from 'react';

// const Symbolinfo: React.FC = () => {
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const container = containerRef.current;

//     if (container) {
//       // Clear previous widget content
//       container.innerHTML = '';

//       // Create and add new script
//       const script = document.createElement('script');
//       script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js';
//       script.async = true;
//       script.innerHTML = JSON.stringify({
//         symbol: "NASDAQ:AAPL",
//         width: 550,
//         locale: "en",
//         colorTheme: "light",
//         isTransparent: false,
//         largeChartUrl: "http://localhost:3000/main/stock", // Redirect URL when clicking the symbol
//       });

//       container.appendChild(script);
//     }

//     // Cleanup function to remove the script when the component unmounts
//     return () => {
//       if (container) {
//         container.innerHTML = '';
//       }
//     };
//   }, []);

//   return (
//     <div className="tradingview-widget-container" ref={containerRef}>
//       <div className="tradingview-widget-container__widget"></div>
//       <div className="tradingview-widget-copyright">
//         <a
//           href="https://www.tradingview.com/"
//           rel="noopener nofollow"
//           target="_blank"
//         >
//           <span className="blue-text">Track all markets on TradingView</span>
//         </a>
//       </div>
//     </div>
//   );
// };

// export default Symbolinfo;
"use client";

import React, { useEffect, useRef } from 'react';

interface SymbolInfoProps {
  searchInputValue?: string;
}

const Symbolinfo: React.FC<SymbolInfoProps> = ({ searchInputValue }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const typedInput = searchInputValue || "AAPL"; // Default to "AAPL" if no input is provided

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      // Clear previous widget content
      container.innerHTML = '';

      // Create and add new script
      const script = document.createElement('script');
      script.id = 'tradingview-widget-symbol-info-script';
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js';
      script.async = true;
      script.innerHTML = JSON.stringify({
        symbol: typedInput, // Use dynamic symbol
        width: "100%",
        locale: "en",
        colorTheme: "dark", // Set to dark theme
        isTransparent: false,
        height: 185,
        largeChartUrl: `http://localhost:3000/main/stock?symbol=${typedInput}` // Redirect to your custom path
      });

      container.appendChild(script);
    }

    // Cleanup function to remove the script
    return () => {
      const existingScript = document.getElementById('tradingview-widget-symbol-info-script');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [typedInput]); // Update whenever the symbol changes

  return (
    <div className="tradingview-widget-container">
      <div ref={containerRef}></div>
      <div className="tradingview-widget-copyright">
        {/* <a href="https://www.tradingview.com" rel="noopener noreferrer" target="_blank">
          <span className="blue-text">Track all markets on TradingView</span>
        </a> */}
      </div>
    </div>
  );
};

export default Symbolinfo;
