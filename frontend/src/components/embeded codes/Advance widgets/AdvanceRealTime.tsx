// import React, { useEffect, useRef } from "react";

// const AdvanceRealTime: React.FC = () => {
//   const containerRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const container = containerRef.current;

//     if (container && !container.querySelector("script")) {
//       const script = document.createElement("script");
//       script.src =
//         "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
//       script.type = "text/javascript";
//       script.async = true;

//       const config = {
//         autosize: true,
//         symbol: "NASDAQ:AAPL",
//         timezone: "Etc/UTC",
//         theme: "dark",
//         style: "1",
//         locale: "en",
//         withdateranges: true,
//         range: "ALL",
//         hide_side_toolbar: false,
//         allow_symbol_change: true,
//         details: true,
//         hotlist: true,
//         calendar: true,
//         show_popup_button: true,
//         popup: true,
//         popup_width: "1000",
//         popup_height: "650",
//         // support_host: "https://www.tradingview.com",
//       };

//       script.innerHTML = JSON.stringify(config);

//       // Append script to container after a delay to ensure DOM is fully ready
//       const timeoutId = setTimeout(() => {
//         container.appendChild(script);
//       }, 100);

//       // Clear the timeout if component unmounts before script is appended
//       return () => {
//         clearTimeout(timeoutId);
//       };
//     }

//     return () => {
//       if (container) {
//         const scriptElement = container.querySelector("script");
//         if (scriptElement) {
//           container.removeChild(scriptElement);
//         }
//       }
//     };
//   }, []);

//   return (
//     <div className="h-screen w-full">
//       <div
//         className="tradingview-widget-container h-full w-full py-5"
//         ref={containerRef}
//       >
//         <div className="tradingview-widget-container__widget h-full w-full"></div>
//         <div className="tradingview-widget-copyright"></div>
//       </div>
//     </div>
//   );
// };

// export default AdvanceRealTime;

// full screen
// import React, { useEffect, useRef } from "react";

// const AdvanceRealTime: React.FC = () => {
//   const containerRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const container = containerRef.current;

//     if (container && !container.querySelector("script")) {
//       const script = document.createElement("script");
//       script.src =
//         "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
//       script.type = "text/javascript";
//       script.async = true;

//       const config = {
//         autosize: true, // Ensure the widget resizes automatically
//         symbol: "NASDAQ:AAPL",
//         timezone: "Etc/UTC",
//         theme: "dark",
//         style: "1",
//         locale: "en",
//         withdateranges: true,
//         range: "ALL",
//         hide_side_toolbar: false,
//         allow_symbol_change: true,
//         details: true,
//         hotlist: true,
//         calendar: true,
//         show_popup_button: true,
//         popup_width: "1000",
//         popup_height: "650",
//       };

//       script.innerHTML = JSON.stringify(config);

//       // Append the script to the container
//       const timeoutId = setTimeout(() => {
//         container.appendChild(script);
//       }, 100);

//       return () => {
//         clearTimeout(timeoutId);
//       };
//     }

//     return () => {
//       if (container) {
//         const scriptElement = container.querySelector("script");
//         if (scriptElement) {
//           container.removeChild(scriptElement);
//         }
//       }
//     };
//   }, []);

//   return (
//     <div className="h-screen w-screen"> {/* Full screen width and height */}
//       <div
//         className="tradingview-widget-container h-full w-full"
//         ref={containerRef}
//         style={{ overflow: "hidden" }} // Prevent scroll bars
//       >
//         <div className="tradingview-widget-container__widget h-full w-full "></div>
//         <div className="tradingview-widget-copyright"></div>
//       </div>
//     </div>
//   );
// };

// export default AdvanceRealTime;


"use client";

import React, { useEffect, useRef } from "react";

const AdvanceRealTime: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (container && !container.querySelector("script")) {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;

      const config = {
        autosize: true, // Ensure the widget resizes automatically
        symbol: "NASDAQ:AAPL",
        timezone: "Etc/UTC",
        theme: "dark", // Use dark theme
        style: "1",
        locale: "en",
        withdateranges: true,
        range: "ALL",
        hide_side_toolbar: false,
        allow_symbol_change: true,
        details: true,
        hotlist: true,
        calendar: true,
        show_popup_button: true,
        popup_width: "1000",
        popup_height: "650",
      };

      script.innerHTML = JSON.stringify(config);

      // Append the script to the container
      const timeoutId = setTimeout(() => {
        container.appendChild(script);
      }, 100);

      return () => {
        clearTimeout(timeoutId);
      };
    }

    return () => {
      if (container) {
        const scriptElement = container.querySelector("script");
        if (scriptElement) {
          container.removeChild(scriptElement);
        }
      }
    };
  }, []);

  return (
    <div className="h-screen w-screen bg-[#0d1117]"> {/* Full screen width and height with dark background */}
      <div
        className="tradingview-widget-container h-[90vh] w-full"
        ref={containerRef}
        style={{ overflow: "hidden" }} // Prevent scroll bars
      >
        <div className="tradingview-widget-container__widget h-full w-full"></div>
        <div className="tradingview-widget-copyright"></div>
      </div>
    </div>
  );
};

export default AdvanceRealTime;

