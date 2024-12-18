"use client";

import HeaderLand from '@/components/landing page/header footer landing/HeaderLand';
import FooterLand from '@/components/landing page/header footer landing/FooterLand';
import { CheckoutMain } from '@/components/Checkout/checkoutMain';
import { CheckoutProvider } from './checkoutContext';

export default function CheckoutPage() {

  return(
    <div>
      <CheckoutProvider>

        <HeaderLand />
        <CheckoutMain />
        <FooterLand />

        </CheckoutProvider>
    </div>
  )
}