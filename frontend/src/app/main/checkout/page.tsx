"use client";
import {Sidepanel} from '@/components/Checkout/sidepanel'
import {AddressPanel} from '@/components/Checkout/addressPanel'
import {PaymentDetails} from '@/components/Checkout/paymentDetails'
import {OrderReview} from '@/components/Checkout/orderReview'
import HeaderLand from '@/components/landing page/header footer landing/HeaderLand';
import FooterLand from '@/components/landing page/header footer landing/FooterLand';

export default function CheckoutPage() {
  return(
    <div>
        <HeaderLand />
        <Sidepanel />
        <AddressPanel />
        <PaymentDetails />
        <OrderReview />
        <FooterLand />
    </div>
  )
}