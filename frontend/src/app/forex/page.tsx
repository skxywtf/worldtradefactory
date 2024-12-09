// import ForexCrossRates from "@/components/embeded codes/ForexCrossRates";
// import ForexHeatMap from "@/components/embeded codes/HeatMaps/ForexHeatMap";
// import FooterLand from "@/components/landing page/header footer landing/FooterLand";
// import Link from "next/link";
// import { IoIosSearch, IoMdSettings, IoMdNotifications } from "react-icons/io";
// import { MdAccountCircle } from "react-icons/md";


// export default function ForexDashboard() {
//   return (
//     <div className='h-full w-full  right-0'>
//             <div className='fixed h-16 w-full flex px-10 justify-between border-b border-neutral-700 z-50 bg-black'>
//               <div className='h-full flex items-center'>
//                 <div className='text-xl'>Forex</div>
//               </div>
              
//               <div className='flex items-center gap-3'>
//                 {/* search */}
//                 <div className='bg-neutral-800 px-1 gap-2 rounded-md border border-neutral-600 flex items-center justify-center'>
//                   <IoIosSearch size={20} className='text-neutral-400' />
//                   <input type="text" placeholder='search' className='bg-neutral-800 focus:outline-none focus:border-transparent  py-1' />
//                 </div>

//                 {/* elements */}
//                 <div className='flex gap-3'>
//                   <div className='flex gap-2'>
//                     <Link className=' focus:text-teal-400' href=""><IoMdSettings size={20} className='text-neutral-400 focus:text-teal-400 ' /></Link>
//                     <Link className=' focus:text-teal-400' href="/"><IoMdNotifications size={20} className='text-neutral-400' /></Link>
                    
                    
                    
//                   </div>
//                   <div className='text-neutral-400'>|</div>
//                   <Link className=' focus:text-teal-400' href="/"> <MdAccountCircle size={20} className='text-neutral-400' /></Link>
                 
//                 </div>
//               </div>
//             </div>
//             <div className=" py-20">
//                 <ForexCrossRates />
//                 <ForexHeatMap />
                
//             </div>
//             <FooterLand />

//     </div>
            
//   )
// } // earlier one
// import ForexCrossRates from "@/components/embeded codes/ForexCrossRates";
// import ForexHeatMap from "@/components/embeded codes/HeatMaps/ForexHeatMap";
// import FooterLand from "@/components/landing page/header footer landing/FooterLand";
// import HeaderLand from "@/components/landing page/header footer landing/HeaderLand";

// export default function ForexDashboard() {
//   return (
//     <div className="h-full w-full right-0 bg-black">
//       {/* Header */}
//       <HeaderLand />

//       {/* Main Content */}
//       <div className="py-10 px-5"> {/* Reduced space-y value */}
//         {/* Forex Cross Rates Widget */}
//         <div>
//           <h2 className="text-xl font-semibold text-white mb-3">Forex Cross Rates</h2> {/* Reduced mb */}
//           <ForexCrossRates />
//         </div>

//         {/* Forex Heatmap Widget */}
//         <div>
//           <h2 className="text-xl font-semibold text-white mb-3">Forex Heatmap</h2> {/* Reduced mb */}
//           <ForexHeatMap />
//         </div>
//       </div>

//       {/* Footer */}
//       <FooterLand />
//     </div>
//   );
// }

"use client";
import ForexCrossRates from "@/components/embeded codes/ForexCrossRates";
import ForexHeatMap from "@/components/embeded codes/HeatMaps/ForexHeatMap";
import FooterLand from "@/components/landing page/header footer landing/FooterLand";
import HeaderLand from "@/components/landing page/header footer landing/HeaderLand";
import { useTheme } from "next-themes";

export default function ForexDashboard() {
  const { theme } = useTheme();

  return (
    <div
      className={`h-full w-full right-0 ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* Header */}
      <HeaderLand />

      {/* Main Content */}
      <div className="py-10 px-5">
        {/* Forex Cross Rates Widget */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Forex Cross Rates</h2>
          <ForexCrossRates />
        </div>

        {/* Forex Heatmap Widget */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Forex Heatmap</h2>
          <ForexHeatMap />
        </div>
      </div>

      {/* Footer */}
      <FooterLand />
    </div>
  );
}

