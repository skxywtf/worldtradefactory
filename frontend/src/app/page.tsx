"use client";
import { HomeHeader } from "@/components/testPage/mainHomeHeader";
import HomeFooter from "@/components/testPage/mainHomeFooter";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import globeTrade from "@/assets/globeTrade.jpg"

export default function HomePage() {
    const router = useRouter()
    const companyName = "Welcome to SKXYWTF"; // Company name
    const tagline = "Invest Smartly, Grow Sustainably."; // Tagline
  
    const [displayCompanyName, setDisplayCompanyName] = useState(""); // For company name animation
    const [displayTagline, setDisplayTagline] = useState(""); // For tagline animation
    const [currentIndexCompany, setCurrentIndexCompany] = useState(0); // Index for company name
    const [currentIndexTagline, setCurrentIndexTagline] = useState(0); // Index for tagline
  
    // Animation for company name
    useEffect(() => {
      if (currentIndexCompany < companyName.length) {
        const interval = setInterval(() => {
          setDisplayCompanyName((prev) => prev + companyName[currentIndexCompany]);
          setCurrentIndexCompany(currentIndexCompany + 1);
        }, 100); // 100ms delay between each letter
  
        return () => clearInterval(interval);
      }
    }, [currentIndexCompany, companyName]);
  
    useEffect(() => {
      if (currentIndexCompany === companyName.length && currentIndexTagline < tagline.length) {
        const interval = setInterval(() => {
          setDisplayTagline((prev) => prev + tagline[currentIndexTagline]);
          setCurrentIndexTagline(currentIndexTagline + 1);
        }, 100); // 100ms delay between each letter
  
        return () => clearInterval(interval);
      }
    }, [currentIndexTagline, currentIndexCompany, tagline]);

  
    return (
      <div className="text-center">
  
        <div className="fixed top-0 left-0 right-0 z-50 h-16">
          <HomeHeader />
        </div>
  
        <div className="relative bg-cover bg-center h-screen pt-16" 
        style={{ backgroundImage: `url(${globeTrade.src})` }}>
          
          <div className="absolute inset-0 bg-black opacity-50"></div> 

          <div className="relative flex flex-col items-center justify-center h-full space-y-8">
            
            {/* Company Name */}
            <h1 className="text-[2.5rem] font-semibold text-white"> 
              {displayCompanyName}
            </h1>
  
            {/* Tagline */}
            <h2 className="text-[2rem] font-medium text-yellow-300"> 
              {displayTagline}
            </h2>
  
            {/* Buttons */}
            <div className="space-x-4">
              <button onClick={() => router.push("/home")} 
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition duration-300">
                Get Started
              </button>
              <button onClick={() => router.push("/stockbot")}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition duration-300">
                Stock Bot
              </button>
            </div>
          </div>
        </div>
  
        <HomeFooter />
      </div>
    );
  }