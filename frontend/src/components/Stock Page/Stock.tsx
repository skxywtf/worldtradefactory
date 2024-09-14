"use client";

// import React from "react";
// import { BiSolidUpArrow } from "react-icons/bi";
// import { FaShareAlt } from "react-icons/fa";
// import { FaBookmark } from "react-icons/fa6";
// import Google from "../../assets/googleLogo.webp";
// import BestPerform from "../Mian Page/BestPerform";
// import IndexETF from "../Mian Page/IndexETF";
// import Navbar from "../header and Footer/Navbar";
// import Footer from "../header and Footer/Footer";
// import SymbolInfo from "../embeded codes/SymbolInfo";
// import AdvanceRealTime from "../embeded codes/Advance widgets/AdvanceRealTime";
// import CompanyProfile from "../embeded codes/other widgets/CompanyProfile";
// import TechnicalAnalysis from "../embeded codes/TechnicalAnalysis";
// import TopStories from "../embeded codes/Advance widgets/TopStories";



// // Define the type for the component's props (none in this case)
// const Stock: React.FC = () => {
//   return (
//     <div className="dark:bg-gray-200 dark:text-black">
//       <Navbar />
//       <div className="pt-40 h-full w-full">
//         <div className="flex w-full justify-between px-10">
//           {/* left */}
//           <div className="w-1/2 justify-center">
//             <div className="flex items-center">
//               <img
//                 src={Google.src} // TypeScript needs .src for StaticImageData
//                 alt="Google Logo"
//                 className="h-10 w-14 rounded-md"
//               />
//               <div className="mx-5">
//                 <button className="border rounded-lg p-1 bg-gray-700">
//                   GOOG
//                 </button>
//                 <div className="py-3"></div>
//                 <div className="flex">
//                   <div>$ 999 &nbsp;</div>
//                   <div className="flex items-center text-green-500">
//                     <BiSolidUpArrow />
//                     <div> &nbsp;27%</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* right */}
//           <div className="w-1/2">
//             <div>
//               Google LLC is an American multinational corporation and technology
//               company focusing on online advertising, search engine technology,
//               cloud computing, computer software, quantum computing, e-commerce,
//               consumer electronics, and artificial intelligence
//             </div>
//             <br />
//             <br />
//             <div className="flex">
//               <button className="flex mx-3 bg-orange-500 text-black p-3 lg:px-5 border rounded-md items-center">
//                 <FaBookmark />
//                 &nbsp;Follow Stock
//               </button>
//               <button className="mx-3 p-3 lg:px-5 bg-gray-500 border rounded-md">
//                 <FaShareAlt />
//               </button>
//               <button className="mx-3 p-3 lg:px-5 bg-gray-500 border rounded-md">
//                 Ask AI
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* stock */}
//       <div className="w-full h-14 lg:h-18 flex justify-center my-10">
//         <div className="bg-gray-500 w-[90%] h-full rounded-lg items-center flex justify-evenly">
//           <div className="flex">
//             {" "}
//             <div>Market Cap </div>
//             <div>&nbsp;2.6T</div>
//           </div>
//           <div className="flex">
//             <div>52W Range</div>
//             <div>&nbsp;68.4 - 98K</div>
//           </div>
//           <div className="flex">
//             <div>Day's Range</div>
//             <div>&nbsp;1-2K</div>
//           </div>
//           <div className="flex">
//             <div>Volume</div>
//             <div>&nbsp;20M</div>
//           </div>
//         </div>
//       </div>
//       {/*  */}
//       <div></div>
//       {/*  */}
//       <div></div>
//       {/*  */}
//       {/* <Ad /> */}
//       <SymbolInfo />
//       <AdvanceRealTime />
//       <CompanyProfile />
//       <TechnicalAnalysis />
//       <TopStories />
//       <BestPerform />
//       <IndexETF />
//       <Footer />
//     </div>
//   );
// };

// export default Stock;

// import React from "react";
// import { BiSolidUpArrow } from "react-icons/bi";
// import { FaShareAlt } from "react-icons/fa";
// import { FaBookmark } from "react-icons/fa6";
// import Google from "../../assets/googleLogo.webp";
// import BestPerform from "../Mian Page/BestPerform";
// import IndexETF from "../Mian Page/IndexETF";
// import Navbar from "../header and Footer/Navbar";
// import React, { useEffect, useRef } from 'react';
// import { useSymbol } from './SymbolContext';
// import {SymbolProvider} from './SymbolContext';
// import Symbolinfo from './Symbolinfo';
// import TradingViewWidget from './TradingViewWidget';
// import CompanyProfileWidget from './CompanyProfileWidget';
// import FundamentalDataWidget from './FundamentalDataWidget';
// import TechnicalAnalysisWidget from './TechnicalAnalysisWidget';
// import TopStoriesWidget from './TopStoriesWidget';


// // import Footer from './Footer';

// const Stock: React.FC = () => {
//     const { symbol } = useSymbol();

//     useEffect(() => {
//         const createWidget = (templateId: string, targetId: string, symbol: string) => {
//             const template = document.getElementById(templateId) as HTMLTemplateElement;
//             const target = document.getElementById(targetId);

//             if (template && target) {
//                 target.innerHTML = '';
//                 const clone = template.content.cloneNode(true) as HTMLElement;
//                 const script = clone.querySelector('script') as HTMLScriptElement;
//                 script.textContent = script.textContent?.replace(/"symbol": "([^"]*)"/g, `"symbol": "${symbol}"`);
//                 target.appendChild(clone);
//             }
//         };

//         createWidget('symbol-info-template', 'symbol-info', symbol);
//         createWidget('advanced-chart-template', 'advanced-chart', symbol);
//         createWidget('company-profile-template', 'company-profile', symbol);
//         createWidget('fundamental-data-template', 'fundamental-data', symbol);
//         createWidget('technical-analysis-template', 'technical-analysis', symbol);
//         createWidget('top-stories-template', 'top-stories', symbol);
//     }, [symbol]);

//     return (
//       <SymbolProvider>
//         <main>
//             <section id="symbol-info"><Symbolinfo /></section>
//             <section id="advanced-chart"><TradingViewWidget symbol={symbol} /> </section>
//             <section id="company-profile"><CompanyProfileWidget /></section>
//             <section id="fundamental-data"><FundamentalDataWidget /></section>
//             <section id="technical-analysis"><TechnicalAnalysisWidget /></section>         
//             <section id="top-stories"><TopStoriesWidget /></section>
            
//         </main>
//       </SymbolProvider>  
//     );  
//   };
// export default Stock;


/* here the search box is implemented in stock page as well
import React, { useState, useEffect } from 'react';
import { useSymbol } from './SymbolContext';
import Symbolinfo from './Symbolinfo';
import TradingViewWidget from './TradingViewWidget';
import CompanyProfileWidget from './CompanyProfileWidget';
import FundamentalDataWidget from './FundamentalDataWidget';
import TechnicalAnalysisWidget from './TechnicalAnalysisWidget';
import TopStoriesWidget from './TopStoriesWidget';
import {SymbolProvider} from './SymbolContext';

const Stock: React.FC = () => {
    const { symbol } = useSymbol();
    const [searchInput, setSearchInput] = useState<string>(symbol);

    useEffect(() => {
        const createWidget = (templateId: string, targetId: string, symbol: string) => {
            const template = document.getElementById(templateId) as HTMLTemplateElement;
            const target = document.getElementById(targetId);

            if (template && target) {
                target.innerHTML = '';
                const clone = template.content.cloneNode(true) as HTMLElement;
                const script = clone.querySelector('script') as HTMLScriptElement;
                script.textContent = script.textContent?.replace(/"symbol": "([^"]*)"/g, `"symbol": "${symbol}"`);
                target.appendChild(clone);
            }
        };

        createWidget('symbol-info-template', 'symbol-info', symbol);
        createWidget('advanced-chart-template', 'advanced-chart', symbol);
        createWidget('company-profile-template', 'company-profile', symbol);
        createWidget('fundamental-data-template', 'fundamental-data', symbol);
        createWidget('technical-analysis-template', 'technical-analysis', symbol);
        createWidget('top-stories-template', 'top-stories', symbol);
    }, [symbol]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    };

    return (
      <SymbolProvider>
        <main>
            <input
              type="text"
              placeholder="Enter symbol"
              value={searchInput}
              onChange={handleSearchChange}
              style={{ marginBottom: '20px', padding: '8px' }}
            />
            <section id="symbol-info"><Symbolinfo /></section>
            <section id="advanced-chart"><TradingViewWidget symbol={searchInput} /> </section>
            <section id="company-profile"><CompanyProfileWidget /></section>
            <section id="fundamental-data"><FundamentalDataWidget /></section>
            <section id="technical-analysis"><TechnicalAnalysisWidget searchInputValue={searchInput} /></section>         
            <section id="top-stories"><TopStoriesWidget /></section>
        </main>
      </SymbolProvider>  
    );  
};

export default Stock;
*/
import React, { useEffect, useState } from 'react';
import Symbolinfo from './Symbolinfo';
import TradingViewWidget from './TradingViewWidget';
import CompanyProfileWidget from './CompanyProfileWidget';
import FundamentalDataWidget from './FundamentalDataWidget';
import TechnicalAnalysisWidget from './TechnicalAnalysisWidget';
import TopStoriesWidget from './TopStoriesWidget';

const Stock: React.FC = () => {
    const [searchInput, setSearchInput] = useState<string>("");

    useEffect(() => {
        const savedInput = localStorage.getItem("searchInput");
        if (savedInput) {
            setSearchInput(savedInput);
        }
    }, []);

    return (
        <main>
            <section id="symbol-info"><Symbolinfo searchInputValue={searchInput} /></section>
            <section id="advanced-chart"><TradingViewWidget symbol={searchInput} /> </section>
            <section id="company-profile"><CompanyProfileWidget searchInputValue={searchInput} /></section>
            <section id="fundamental-data"><FundamentalDataWidget searchInputValue={searchInput}  /></section>
            <section id="technical-analysis"><TechnicalAnalysisWidget searchInputValue={searchInput} /></section>         
            <section id="top-stories"><TopStoriesWidget searchInputValue={searchInput} /></section>
        </main>
    );  
};

export default Stock;

