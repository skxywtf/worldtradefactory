"use client";
// Previous header
// import React, { FormEvent, useState } from 'react';
// import { useSymbol } from './SymbolContext';
// import SymbolSelector from './SymbolSelector';
// import { useRouter } from 'next/navigation';
// // import HeaderLand from "@/components/landing page/header footer landing/HeaderLand";

// const Header: React.FC = () => {
//     const router = useRouter();
//     const { setSymbol } = useSymbol();
//     const [searchInput, setSearchInput] = useState<string>("");

//     const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         router.push(`/main/stock?tvwidgetsymbol=${encodeURIComponent(searchInput)}`);
//     }

//     return (
//         <header>
//             <a id="site-logo" href="/">SKXYWTF</a>
//             {/* <input type="search" placeholder="Search..." /> */}
//             <div className="">
//             <form
//               onSubmit={handleSubmit}
//               className="h-full items-center"
//             >
//               <input
//                 type="text"
//                 placeholder="Search stocks"
//                 // className="px-5 h-full dark:text-black md:w-100 items-center w-full border-2 border-teal-600 text-black rounded-md"
//                  className=" h-8 bg-neutral-800 focus:outline-none focus:border-transparent rounded-full px-3 text-white"
//                 onChange={(e) => {
//                   setSearchInput(e.target.value);
//                 }}
//               />
//             </form>
//           </div>
//             {/* <SymbolSelector /> */}
//         </header>
//     );
// };

// export default Header;

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

import Logo from "../../../src/assets/skxywtfLogo.jpeg";
import Image from "next/image";

const Header = () => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    // e.preventDefault();
    // Store the symbol in localStorage
    localStorage.setItem("searchInput", searchInput);
    // Redirect to the Stock page
    router.push("/main/stock");
  };

  return (
    <div className="border-b bg-stone-900 border-white w-full h-16">
      <div className="h-full flex items-center justify-between px-10 w-full">
        {/* logo */}
        <div className="w-28">
          <Image
            className="cursor-pointer py-4 h-full w-full"
            onClick={() => router.push("/")}
            src={Logo}
            alt="Logo"
          />
        </div>
        {/* middle parameters */}
        <div className="hidden md:flex gap-7 text-white">
          <button
            className="p-1 px-3 text-lg hover:bg-neutral-800 rounded-full"
            onClick={() => router.push("/main/stock")}
          >
            Stocks
          </button>
          <button className="p-1 px-3 text-lg hover:bg-neutral-800 rounded-full">
            Bonds
          </button>
          <button className="p-1 px-3 text-lg hover:bg-neutral-800 rounded-full">
            Forex
          </button>
          <button className="p-1 px-3 text-lg hover:bg-neutral-800 rounded-full">
            Crypto
          </button>
          <button className="p-1 px-3 text-lg hover:bg-neutral-800 rounded-full">
            About Us
          </button>
        </div>
        {/* search bar */}
        <div>
          <form onSubmit={handleSubmit} className="h-full items-center">
            <input
              type="text"
              placeholder="Search stocks..."
              className="h-8 bg-neutral-800 focus:outline-none focus:border-transparent rounded-full px-3 text-white"
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Header;
