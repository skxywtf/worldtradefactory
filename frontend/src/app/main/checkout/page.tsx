"use client";

import HeaderLand from '@/components/landing page/header footer landing/HeaderLand';
import FooterLand from '@/components/landing page/header footer landing/FooterLand';
import { CheckoutMain } from '@/components/Checkout/checkoutMain';
import { CheckoutProvider } from './checkoutContext';
import { SideNavbar } from '@/components/SideNavbar/sideNav';

export default function CheckoutPage() {

  return(
    <div>
      <CheckoutProvider>

        <HeaderLand />
         <div className="flex flex-col md:flex-row">
          <SideNavbar />
          <div className='w-full'>
           <CheckoutMain />
          </div>
         </div>
        <FooterLand />

      </CheckoutProvider>
    </div>
  )
}