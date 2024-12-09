// import FooterLand from '@/components/landing page/header footer landing/FooterLand'
// import Link from 'next/link'
// import React from 'react'
// import { IoIosSearch, IoMdSettings, IoMdNotifications } from 'react-icons/io'
// import { MdAccountCircle } from 'react-icons/md'
// import Screener from "../../components/embeded codes/Screener";

// export default function ScreenerDashboard() {
//   return (
//     <div className='h-full w-full  right-0'>
//             <div className='fixed h-16 w-full flex px-10 justify-between border-b border-neutral-700 z-50 bg-black'>
//               <div className='h-full flex items-center'>
//                 <div className='text-xl'>Screener</div>
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
//                 <Screener />
                
//             </div>
//             <FooterLand />

//     </div>
//   )
// }
// earlier one
import HeaderLand from '@/components/landing page/header footer landing/HeaderLand'
import FooterLand from '@/components/landing page/header footer landing/FooterLand'
import Link from 'next/link'
import React from 'react'
import { IoIosSearch, IoMdSettings, IoMdNotifications } from 'react-icons/io'
import { MdAccountCircle } from 'react-icons/md'
import Screener from "../../components/embeded codes/Screener";

export default function ScreenerDashboard() {
  return (
          // <div className=" bg-black">
          <div className="min-h-screen flex flex-col bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">
            {/* Header */}
            <HeaderLand />

            <div>
              {/* <h2 className="text-xl font-semibold text-white ">Screener</h2> Reduced mb */}
              <h2 className="text-xl font-semibold  text-neutral-900 dark:text-neutral-100">Screener</h2>
              <Screener />
            </div>    
            <FooterLand />
          </div>
            

    
  )
}
