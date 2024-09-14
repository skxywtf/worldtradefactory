// "use client";
// import React, { useEffect, useRef } from "react";

// const TopStories: React.FC = () => {
//   const containerRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const container = containerRef.current;

//     if (container && !container.querySelector("script")) {
//       const script = document.createElement("script");
//       script.src =
//         "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
//       script.type = "text/javascript";
//       script.async = true;
//       script.innerHTML = `
//         {
//           "feedMode": "all_symbols",
//           "isTransparent": false,
//           "displayMode": "adaptive",
//           "width": 400,
//           "height": 550,
//           "colorTheme": "dark",
//           "locale": "en"
//         }`;

//       // Append script to container after a delay to ensure DOM is fully ready
//       const timeoutId = setTimeout(() => {
//         container.appendChild(script);
//       }, 100);

//       // Clear the timeout if component unmounts before script is appended
//       return () => {
//         clearTimeout(timeoutId);
//         if (container) {
//           const scriptElement = container.querySelector("script");
//           if (scriptElement) {
//             container.removeChild(scriptElement);
//           }
//         }
//       };
//     }
//   }, []);

//   return (
//     <div className="tradingview-widget-container py-10" ref={containerRef}>
//       <div className="tradingview-widget-container__widget"></div>
//       <div className="tradingview-widget-copyright"></div>
//     </div>
//   );
// };

// export default TopStories;


// it will prevent the user from going to other website
"use client";
import React, { useEffect, useRef } from "react";

const TopStories: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (container && !container.querySelector("script")) {
      // Clear any previous widget content
      container.innerHTML = "";

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

      // Append script after a short delay
      const timeoutId = setTimeout(() => {
        container.appendChild(script);

        // Prevent redirection on anchor (`<a>`) tag clicks within the widget
        container.addEventListener("click", (event) => {
          const target = event.target as HTMLElement;
          const anchorTag = target.closest("a"); // Check for the closest anchor tag
          if (anchorTag) {
            event.preventDefault(); // Prevent redirect on anchor tag click
          }
        });
      }, 100);

      // Clean up if the component unmounts
      return () => {
        clearTimeout(timeoutId);
        if (container) {
          container.innerHTML = "";
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



