"use client";
import Subscription from "@/components/header and Footer/Subscription";
import FooterLand from "@/components/landing page/header footer landing/FooterLand";
import HeaderLand from "@/components/landing page/header footer landing/HeaderLand";
import { CheckoutProvider } from "../checkout/checkoutContext";

export default function SubscriptionPage() {

  return (
    <div>

      <CheckoutProvider>
      <HeaderLand />   
      <Subscription />
      <FooterLand />
      </CheckoutProvider>
      
    </div>
  );
}