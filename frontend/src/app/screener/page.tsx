import React from 'react'
import HeaderLand from '@/components/landing page/header footer landing/HeaderLand'
import FooterLand from '@/components/landing page/header footer landing/FooterLand'
import Screener from "../../components/embeded codes/Screener";

export default function ScreenerDashboard() {
  return (
          <div className="flex flex-col bg-neutral-100 dark:bg-black text-neutral-800 dark:text-neutral-200">
            {/* Header */}
            <HeaderLand />

            <div className='mb-8'>
              <h2 className="text-3xl font-semibold mx-10 my-6 text-neutral-900 dark:text-neutral-100">Screener</h2>
              <Screener />
            </div>    
            <FooterLand />
          </div>
  )
}