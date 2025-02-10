// "use client";
// import React, { useState, useEffect, FormEvent } from "react";
// import { useRouter } from "next/navigation";
// import { Moon, Sun } from "lucide-react";
// import { useTheme } from "next-themes";

// import Logo from "../../../assets/skxywtfLogo.jpeg";
// import Image from "next/image";

// const HeaderLand = () => {
//   const router = useRouter();
//   const [searchInput, setSearchInput] = useState<string>("");
//   const { theme, setTheme, systemTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);

//   // Wait for the theme to be mounted to avoid hydration mismatch
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     // Store the symbol in localStorage
//     localStorage.setItem("searchInput", searchInput);
//     // Redirect to the Stock page
//     router.push("/main/stock");
//   };

//   // Handle loading state to prevent hydration error
//   if (!mounted) return null;

//   const currentTheme = theme === "system" ? systemTheme : theme;

//   return (
//     <div
//       className={`border-b w-full h-16 ${
//         currentTheme === "dark" ? "border-white bg-black" : "border-black bg-white"
//       }`}
//     >
//       <div className="h-full flex items-center justify-between px-10 w-full">
//         {/* logo */}
//         <div className="w-28">
//           <Image
//             className="cursor-pointer py-4 h-full w-full"
//             onClick={() => router.push("/")}
//             src={Logo}
//             alt="Logo"
//           />
//         </div>
//         {/* middle parameters */}
//         <div className="hidden md:flex gap-7 text-white">
//           <button
//             className={`p-1 px-2 text-same rounded-full ${
//               currentTheme === "dark"
//                 ? "text-white hover:bg-neutral-800"
//                 : "text-black hover:bg-neutral-300"
//             }`}
//             onClick={() => router.push("/main/stock")}
//           >
//             Stocks
//           </button>
//           <button
//             className={`p-1 px-2 text-base rounded-full ${
//               currentTheme === "dark"
//                 ? "text-white hover:bg-neutral-800"
//                 : "text-black hover:bg-neutral-300"
//             }`}
//             onClick={() => router.push("/screener")}
//           >
//             Screener
//           </button>
//           <button
//             className={`p-1 px-2 text-base rounded-full ${
//               currentTheme === "dark"
//                 ? "text-white hover:bg-neutral-800"
//                 : "text-black hover:bg-neutral-300"
//             }`}
//             onClick={() => router.push("/forex")}
//           >
//             Forex
//           </button>
//           <button
//             className={`p-1 px-2 text-base rounded-full ${
//               currentTheme === "dark"
//                 ? "text-white hover:bg-neutral-800"
//                 : "text-black hover:bg-neutral-300"
//             }`}
//             onClick={() => router.push("/crypto")}
//           >
//             Crypto
//           </button>
//           <button
//             className={`p-1 px-2 text-base rounded-full ${
//               currentTheme === "dark"
//                 ? "text-white hover:bg-neutral-800"
//                 : "text-black hover:bg-neutral-300"
//             }`}
//             onClick={() => router.push("/main/about")}
//           >
//             AboutUs
//           </button>
//         </div>
//         {/* search bar */}
//         <div className="flex gap-3">
//           <form onSubmit={handleSubmit} className="h-full items-center">
//             <input
//               type="text"
//               placeholder="Search stocks"
//               className={`h-8 focus:outline-none focus:border-transparent rounded-full p-4 ${
//                 currentTheme === "dark"
//                   ? "bg-neutral-800 text-white"
//                   : "bg-neutral-200 text-black"
//               }`}
//               onChange={(e) => setSearchInput(e.target.value)}
//             />
//           </form>
//           <button className="p-1 px-3 text-lg rounded-full">
//             {currentTheme === "dark" ? (
//               <Sun
//                 className="h-[1.2rem] w-[1.2rem] text-white"
//                 onClick={() => setTheme("light")}
//               />
//             ) : (
//               <Moon
//                 className="h-[1.2rem] w-[1.2rem] text-black"
//                 onClick={() => setTheme("dark")}
//               />
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeaderLand;

"use client";
import React, { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";

import Logo from "../../../assets/skxywtfLogo.jpeg";
import Image from "next/image";

const HeaderLand = () => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState<string>("");
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem("user")))
  // const user = localStorage.getItem("user");
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    localStorage.setItem("searchInput", searchInput);
    
    router.push("/main/stock");
  };

  // Handle loading state to prevent hydration error
  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div
      className={`border-b w-full h-16 ${
        currentTheme === "dark" ? "border-white bg-black" : "border-black bg-white"
      }`}
    >
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
        
        <div className="hidden md:flex gap-7 text-white">
          <button
            className={`p-1 px-2 text-lg rounded-full ${
              currentTheme === "dark"
                ? "text-white hover:bg-neutral-800"
                : "text-black hover:bg-neutral-300"
            }`}
            onClick={() => router.push("/main/stock")}
          >
            Stocks
          </button>
          <button
            className={`p-1 px-2 text-lg rounded-full ${
              currentTheme === "dark"
                ? "text-white hover:bg-neutral-800"
                : "text-black hover:bg-neutral-300"
            }`}
            onClick={() => router.push("/screener")}
          >
            Screener
          </button>
          <button
            className={`p-1 px-2 text-lg rounded-full ${
              currentTheme === "dark"
                ? "text-white hover:bg-neutral-800"
                : "text-black hover:bg-neutral-300"
            }`}
            onClick={() => router.push("/forex")}
          >
            Forex
          </button>
          <button
            className={`p-1 px-2 text-lg rounded-full ${
              currentTheme === "dark"
                ? "text-white hover:bg-neutral-800"
                : "text-black hover:bg-neutral-300"
            }`}
            onClick={() => router.push("/crypto")}
          >
            Crypto
          </button>
          <button
            className={`p-1 px-2 text-lg rounded-full ${
              currentTheme === "dark"
                ? "text-white hover:bg-neutral-800"
                : "text-black hover:bg-neutral-300"
            }`}
          >
            About Us
          </button>
        </div>
        {/* search bar */}
        <div className="flex gap-3 relative">
          <form onSubmit={handleSubmit} className="h-full items-center">
            <input
              type="text"
              placeholder="Search stocks"
              className={`h-8 focus:outline-none focus:border-transparent rounded-full p-4 ${
                currentTheme === "dark"
                  ? "bg-neutral-800 text-white"
                  : "bg-neutral-200 text-black"
              }`}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </form>
          <button className="p-1 px-3 text-lg rounded-full">
            {currentTheme === "dark" ? (
              <Sun
                className="h-[1.2rem] w-[1.2rem] text-white"
                onClick={() => setTheme("light")}
              />
            ) : (
              <Moon
                className="h-[1.2rem] w-[1.2rem] text-black"
                onClick={() => setTheme("dark")}
              />
            )}
          </button>
          <div className="relative">
            <button
              className="p-1 px-3 text-lg rounded-full"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <User className="h-[1.2rem] w-[1.2rem] text-gray-500 hover:text-black dark:hover:text-white" />
            </button>
            {dropdownOpen && (
              <div
                className={`absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg dark:bg-neutral-800 dark:border-neutral-700`}
              >
                <button
                  className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-neutral-700"
                  onClick={() => {
                    setDropdownOpen(false);
                    router.push("/main/account");
                  }}
                >
                  My Profile
                </button>

                {isLoggedIn ? <button 
                className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-neutral-700" onClick={() => {
                  setDropdownOpen(false);
                  router.push("/main/login");
                  setIsLoggedIn(false);
                  localStorage.removeItem('user');
                }}> Logout </button> :
                <button
                  className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-neutral-700"
                  onClick={() => {
                    setDropdownOpen(false);
                    router.push("/main/login");
                  }}
                >
                  Login
                </button> }

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderLand