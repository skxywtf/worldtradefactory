"use client";
import React from 'react';
import { useSymbol } from './SymbolContext';
import SymbolSelector from './SymbolSelector';
// import HeaderLand from "@/components/landing page/header footer landing/HeaderLand";


const Header: React.FC = () => {
    const { setSymbol } = useSymbol();

    return (
        <header>
            <a id="site-logo" href="#">SKXYWTF</a>
            {/* <HeaderLand/> */}
            {/* <input type="search" placeholder="Search..." />
            <SymbolSelector /> */}
        </header>
    );
};

export default Header;

//import React from 'react'; 
// import { useSymbol } from './SymbolContext';
//import HeaderLand from "@/components/landing page/header footer landing/HeaderLand"; // Importing the HeaderLand component
// import React, { useState, FormEvent } from "react";
// import { useRouter } from "next/navigation";

// const Header = () => {
//     const router = useRouter();
//     const [searchInput, setSearchInput] = useState<string>("");
  
//     const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//       e.preventDefault();
//       // Store the symbol in localStorage
//       localStorage.setItem("searchInput", searchInput);
//       // Redirect to the Stock page
//       router.push("/main/stock");
//     };

//     return (
//         <header>
//             <a id="site-logo" href="#">SKXYWTF</a>
//         <div>
//           <form onSubmit={handleSubmit} className="h-full items-center">
//             <input
//               type="text"
//               placeholder="search stocks"
//               className="h-8 bg-neutral-800 focus:outline-none focus:border-transparent rounded-full px-3"
//               onChange={(e) => setSearchInput(e.target.value)}
//             />
//           </form>
//         </div>
//             {/* Use the HeaderLand component which includes the search bar */}
            
//         </header>
//     );
// };

// export default Header;
