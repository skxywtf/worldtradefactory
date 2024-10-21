import { TestHeader } from "./testHeader";
import bgStocks from "../../assets/bgStocks.jpg"
import Image from "next/image";
import FooterLand from "./testFooter";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HeaderLand from "../landing page/header footer landing/HeaderLand";

// export default function TestPage() {
//     return (
//       <div className="text-center">
//         {/* <TestHeader /> */}
  
//         {/* Background image with dark overlay */}
//         <div className="relative bg-cover bg-center h-screen" style={{ backgroundImage: 'url(../../assets/worldBG.jpg)' }}>
//         <TestHeader />
//           <div className="absolute inset-0 bg-black opacity-50"></div> 
  
          
//           <div className="relative flex flex-col items-center justify-center h-full text-white space-y-8">
//             <h1 className="text-[2.5rem] px-[5rem] font-semibold">
//               Exponential Yield (XY) Financial Products that provide a social and sustainable purpose, while focusing on market competition for maximizing profit.
//             </h1>
  
//             {/* Buttons */}
//             <div className="space-x-4">
//               <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition duration-300">
//                 Get Started
//               </button>
//               <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition duration-300">
//                 Stock Bot
//               </button>
//             </div>
//           </div>
//         </div>
  
//         <FooterLand />
//       </div>
//     );
//   }

// export default function TestPage() {
//   const [sentence, setDisplayText] = useState("");
//   const content = "Welcome to SKXYWTF. Invest Smartly, Grow Sustainably";

//   useEffect(() => {
//     let index = 0;
//     const interval = setInterval(() => {
//       setDisplayText((sentence) => sentence + content[index]); // Add one letter at a time
//       index++;
//       if (index === content.length) clearInterval(interval); // Stop once the full sentence is displayed
//     }, 100); 
//     // letter
//   }, []);

//   return (
//     <div className="text-center">
//       {/* Keep the header as it is */}
//       {/* <TestHeader /> */}

//       {/* Background image with dark overlay */}
//       <div className="relative bg-cover bg-center h-screen" style={{ backgroundImage: 'url(../../assets/worldBG.jpg)' }}>      
//         <div className="absolute inset-0 bg-black opacity-50"></div> {/* Dark overlay */}
//         <TestHeader />
//         {/* Main content with animation */}
//         <div className="relative flex flex-col items-center justify-center h-full text-white space-y-8 animate-slide-in">
//           <h1 className="text-[2.5rem] px-[5rem] font-semibold">
//             {sentence}
//           </h1>

//           {/* Buttons */}
//           <div className="space-x-4">
//             <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition duration-300">
//               Get Started
//             </button>
//             <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition duration-300">
//               Stock Bot
//             </button>
//           </div>
//         </div>
//       </div>

//       <FooterLand />
//     </div>
//   );
// }

// export default function TestPage() {
//     const router = useRouter();
//     const content = "Welcome to SKXYWTF. Invest Smartly, Grow Sustainably."; 
//     const [displayText, setDisplayText] = useState(""); // Final sentence
//     const [currentIndex, setCurrentIndex] = useState(0); // Track index for letters
  
//     useEffect(() => {
//       if (currentIndex < content.length) {
//         const interval = setInterval(() => {
//           setDisplayText((prev) => prev + content[currentIndex]); 
//           setCurrentIndex(currentIndex + 1); // Move to the next letter
//         }, 100); // 100ms delay between each letter
  
//         return () => clearInterval(interval); 
//       }
//     }, [currentIndex, content]);
  
//     return (
//       <div className="text-center">
//         <TestHeader />
  
//         {/* Background image with dark overlay */}
//         <div className="relative bg-cover bg-center h-screen" style={{ backgroundImage: 'url(../../assets/worldBG.jpg)' }}>
//           <div className="absolute inset-0 bg-black opacity-50"></div> {/* Dark overlay */}
  
//           {/* Main content with letter-by-letter animation */}
//           <div className="relative flex flex-col items-center justify-center h-full text-white space-y-8">
//             <h1 className="text-[2.5rem] px-[5rem] font-semibold">
//               {displayText} {/* This will display the sentence progressively */}
//             </h1>
  
            
//             <div className="space-x-4">
//               <button onClick={() => router.push("/")}
//               className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition duration-300">
//                 Get Started
//               </button>
//               <button onClick={() => router.push("/stockbot")}
//               className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition duration-300">
//                 Stock Bot
//               </button>
//             </div>
//           </div>
//         </div>
  
//         <FooterLand />
//       </div>
//     );
//   }

//   import { TestHeader } from "./testHeader";
// import FooterLand from "./testFooter";
// import { useEffect, useState } from "react";

// export default function TestPage() {
//   const companyName = "Welcome to SKXYWTF."; // Company name
//   const tagline = "Invest Smartly, Grow Sustainably."; // Tagline

//   const [displayCompanyName, setDisplayCompanyName] = useState(""); // For company name animation
//   const [displayTagline, setDisplayTagline] = useState(""); // For tagline animation
//   const [currentIndexCompany, setCurrentIndexCompany] = useState(0); // Index for company name
//   const [currentIndexTagline, setCurrentIndexTagline] = useState(0); // Index for tagline

//   // Animation for company name
//   useEffect(() => {
//     if (currentIndexCompany < companyName.length) {
//       const interval = setInterval(() => {
//         setDisplayCompanyName((prev) => prev + companyName[currentIndexCompany]);
//         setCurrentIndexCompany(currentIndexCompany + 1);
//       }, 100); // 100ms delay between each letter

//       return () => clearInterval(interval);
//     }
//   }, [currentIndexCompany, companyName]);

//   // Animation for tagline
//   useEffect(() => {
//     if (currentIndexCompany === companyName.length && currentIndexTagline < tagline.length) {
//       const interval = setInterval(() => {
//         setDisplayTagline((prev) => prev + tagline[currentIndexTagline]);
//         setCurrentIndexTagline(currentIndexTagline + 1);
//       }, 100); // 100ms delay between each letter

//       return () => clearInterval(interval);
//     }
//   }, [currentIndexTagline, currentIndexCompany, tagline]);

//   return (
//     <div className="text-center">
//        <div className="fixed top-0 left-0 right-0 z-50" >
//        <TestHeader />

//         </div> 
//       {/* Background image with dark overlay */}
//       <div className="relative bg-cover bg-center h-screen" style={{ backgroundImage: 'url(../../assets/worldBG.jpg)' }}>
        
//         <div className="absolute inset-0 bg-black opacity-50"></div> {/* Dark overlay */}
 
//         {/* Main content with letter-by-letter animation */}
//         <div className="relative flex flex-col items-center justify-center h-full space-y-8">
          
//           {/* Company Name */}
//           <h1 className="text-[2.5rem] font-semibold text-white"> 
//             {displayCompanyName}
//           </h1>

//           {/* Tagline */}
//           <h2 className="text-[2rem] font-medium text-yellow-300"> 
//             {displayTagline}
//           </h2>

//           {/* Buttons */}
//           <div className="space-x-4">
//             <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition duration-300">
//               Get Started
//             </button>
//             <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition duration-300">
//               Stock Bot
//             </button>
//           </div>
//         </div>
//       </div>

//       <FooterLand />
//     </div>
//   );
// }

export default function TestPage() {
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
        {/* Fixed Header */}
        <div className="fixed top-0 left-0 right-0 z-50 h-16">
          <TestHeader />
          {/* <HeaderLand /> */}
        </div>
  
        {/* Background image with dark overlay */}
        {/* Added padding-top (pt-16) to push the content down */}
        <div className="relative bg-cover bg-center h-[calc(100vh-4rem)] pt-16" style={{ backgroundImage: 'url(../../assets/worldBG.jpg)' }}>
          
          <div className="absolute inset-0 bg-black opacity-50"></div> {/* Dark overlay */}
   
          {/* Main content with letter-by-letter animation */}
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
              <button onClick={() => router.push("/")} 
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
  
        <FooterLand />
      </div>
    );
  }