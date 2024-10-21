// "use client";
// import React from "react";
// import Logo from "../../../assets/skxywtfLogo.jpeg";
// import Image from "next/image";
// import {useRouter } from "next/navigation";
// import { useEffect, useState, FormEvent } from "react";
// const HeaderLand = () => {
//   const router = useRouter();
//   const [searchInput, setSearchInput] = useState<string>("");
//   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     localStorage.setItem("searchInput", searchInput);
//     // Uncomment if needed
//     // navigate("/stock");
//     router.push("/main/stock");
//   };
//   return (
//     <div className=" border-b border-white w-full h-16">
//       <div className=" h-full flex items-center justify-between px-10 w-full">
//         {/* logo */}
//         <div className="  w-28 ">
//           <Image
//             className=" cursor-pointer py-4 h-full w-full"
//             src={Logo}
//             alt=""
//           />
//         </div>
//         {/* middle parameters */}
//         <div className=" hidden md:flex gap-7">
//           <button className=" p-1 px-3 text-lg hover:bg-neutral-800 rounded-full">
//             Stocks
//           </button>
//           <button className=" p-1 px-3 text-lg hover:bg-neutral-800 rounded-full">
//             Bonds
//           </button>
//           <button className=" p-1 px-3 text-lg hover:bg-neutral-800 rounded-full">
//             Forex
//           </button>
//           <button className=" p-1 px-3 text-lg hover:bg-neutral-800 rounded-full">
//             Crypto
//           </button>
//           <button className=" p-1 px-3 text-lg hover:bg-neutral-800 rounded-full">
//             About Us
//           </button>
//         </div>
//         {/* search bar */}
//         {/* <div className="">
//           <form>
//             <input
//               className=" h-8 bg-neutral-800 focus:outline-none focus:border-transparent  rounded-full px-3"
//               type="text"
//               placeholder="Search"
//             />
//           </form>
//         </div> */}
//         {/* <div className="w-full h-10 flex justify-center md:justify-start md:px-20"> */}
//          <div className="">
//             <form
//               onSubmit={handleSubmit}
//               className="h-full items-center"
//             >
//               <input
//                 type="text"
//                 placeholder="search stocks"
//                 // className="px-5 h-full dark:text-black md:w-100 items-center w-full border-2 border-teal-600 text-black rounded-md"
//                  className=" h-8 bg-neutral-800 focus:outline-none focus:border-transparent  rounded-full px-3"
//                 onChange={(e) => {
//                   setSearchInput(e.target.value);
//                 }}
//               />
//             </form>
//           </div>
//       </div>
//     </div>
//   );
// };

// export default HeaderLand;


// // trying

// use this for recent
"use client";
// import React from "react";
// import Logo from "../../../assets/skxywtfLogo.jpeg";
// import Image from "next/image";
// import {useRouter } from "next/navigation";
// import { useEffect, useState, FormEvent } from "react";
// const HeaderLand = () => {
//   const router = useRouter();
//   const [searchInput, setSearchInput] = useState<string>("");
//   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     router.push(`/main/stock?tvwidgetsymbol=${encodeURIComponent(searchInput)}`);
//   };
//   // redirecting to adavnced widget page
//   // const handleStockClick = () => {
//   //   router.push("/Stock"); // Redirect to Stock page
//   // };
  
//   return (
//     <div className=" border-b border-white w-full h-16">
//       <div className=" h-full flex items-center justify-between px-10 w-full">
//         {/* logo */}
//         <div className="  w-28 ">
//           <Image
//             className=" cursor-pointer py-4 h-full w-full"
//             src={Logo}
//             alt=""
//           />
//         </div>
//         {/* middle parameters */}
//         <div className=" hidden md:flex gap-7">
//           {/* <button className=" p-1 px-3 text-lg hover:bg-neutral-800 rounded-full">
//             Stocks
//           </button> */}
//            {/* heading to real-time widget */}
//            <button
//             className="p-1 px-3 text-lg hover:bg-neutral-800 rounded-full"
//             onClick={() => router.push("/Stock")} // Call the stock page redirect function on click
//           >
//             Stocks
//           </button>
//           <button className=" p-1 px-3 text-lg hover:bg-neutral-800 rounded-full">
//             Bonds
//           </button>
//           <button className=" p-1 px-3 text-lg hover:bg-neutral-800 rounded-full">
//             Forex
//           </button>
//           <button className=" p-1 px-3 text-lg hover:bg-neutral-800 rounded-full">
//             Crypto
//           </button>
//           <button className=" p-1 px-3 text-lg hover:bg-neutral-800 rounded-full">
//             About Us
//           </button>
//         </div>
//         {/* search bar */}
//         {/* <div className="">
//           <form>
//             <input
//               className=" h-8 bg-neutral-800 focus:outline-none focus:border-transparent  rounded-full px-3"
//               type="text"
//               placeholder="Search"
//             />
//           </form>
//         </div> */}
//         {/* <div className="w-full h-10 flex justify-center md:justify-start md:px-20"> */}
//          <div className="">
//             <form
//               onSubmit={handleSubmit}
//               className="h-full items-center"
//             >
//               <input
//                 type="text"
//                 placeholder="search stocks"
//                 // className="px-5 h-full dark:text-black md:w-100 items-center w-full border-2 border-teal-600 text-black rounded-md"
//                  className=" h-8 bg-neutral-800 focus:outline-none focus:border-transparent  rounded-full px-3"
//                 onChange={(e) => {
//                   setSearchInput(e.target.value);
//                 }}
//               />
//             </form>
//           </div>
//       </div>
//     </div>
//   );
// };

// export default HeaderLand;




// here the url path issue is resolved
// import React, { useState, FormEvent } from "react";
// import Logo from "../../../assets/skxywtfLogo.jpeg";
// import Image from "next/image";
// import { useRouter } from "next/navigation";

// const HeaderLand = () => {
//   const router = useRouter();
//   const [searchInput, setSearchInput] = useState<string>("");

//   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     // Store the symbol in localStorage
//     localStorage.setItem("stockSymbol", searchInput);
//     // Redirect to the Stock page
//     router.push("/main/stock");
//   };

//   return (
//     <div className="border-b border-white w-full h-16">
//       <div className="h-full flex items-center justify-between px-10 w-full">
//         {/* logo */}
//         <div className="w-28">
//           <Image
//             className="cursor-pointer py-4 h-full w-full"
//             src={Logo}
//             alt="Logo"
//           />
//         </div>
//         {/* middle parameters */}
//         <div className="hidden md:flex gap-7">
//           <button
//             className="p-1 px-3 text-lg hover:bg-neutral-800 rounded-full"
//             onClick={() => router.push("/main/stock")}
//           >
//             Stocks
//           </button>
//           <button className="p-1 px-3 text-lg hover:bg-neutral-800 rounded-full">
//             Bonds
//           </button>
//           <button className="p-1 px-3 text-lg hover:bg-neutral-800 rounded-full">
//             Forex
//           </button>
//           <button className="p-1 px-3 text-lg hover:bg-neutral-800 rounded-full">
//             Crypto
//           </button>
//           <button className="p-1 px-3 text-lg hover:bg-neutral-800 rounded-full">
//             About Us
//           </button>
//         </div>
//         {/* search bar */}
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
//       </div>
//     </div>
//   );
// };

// export default HeaderLand;
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

import Logo from "../../../assets/skxywtfLogo.jpeg";
import Image from "next/image";

const HeaderLand = () => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

export default HeaderLand;
