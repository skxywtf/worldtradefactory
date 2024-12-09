// components/NavBar.js
'use client'
import Link from 'next/link';
import { useState } from 'react';
import { BsGlobe2 } from "react-icons/bs";


const NavBar1 = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-black text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left Side Logo */}
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <div className="text-2xl font-bold h-20 w-20">SKXYWTF</div>
  

        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <Link href="/products" className="hover:text-blue-500">Products</Link>
         
          <Link href="/community" className="text-white hover:text-blue-500 ">Community</Link>
          <Link href="/markets" className="text-white hover:text-white-500">Markets</Link>
          <Link href="/news" className="text-white hover:text-blue-500">News</Link>
          <Link href="/brokers" className="text-white hover:text-blue-500">Brokers</Link>
          <Link href="/more" className="text-white hover:text-blue-500">More</Link>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-4">
          {/* Globe Icon with Dropdown */}
          <div className="relative">
            <div
              className="hover:text-white-500 flex items-center space-x-1 cursor-pointer"
              onClick={toggleDropdown}
            >
              
             
                <BsGlobe2
                
               
                viewBox="0 0 24 17"
                stroke="currentColor"
                className="w-8 h-6" />
               
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20"
                />
              
              <span>IN</span>
            </div>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-gray-800 text-white rounded shadow-lg z-10">
                <div className="px-4 py-2 hover:bg-gray-700 cursor-pointer">English</div>
                <div className="px-4 py-2 hover:bg-gray-700 cursor-pointer">English (India)</div>
                <div className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Deutsch</div>
                <div className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Français</div>
                <div className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Español</div>
                <div className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Italiano</div>
                <div className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Polski</div>
                <div className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Türkçe</div>
                <div className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Русский</div>
                <div className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Português</div>
                <div className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Bahasa Indonesia</div>
              
              </div>
            )}
          </div>

          {/* User Icon */}
          <div className="hover:text-blue-500 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5.121 17.804A10.97 10.97 0 0112 16c2.623 0 5.026.948 6.879 2.804M12 12a4 4 0 100-8 4 4 0 000 8z"
              />
            </svg>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar1;
