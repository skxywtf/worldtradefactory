"use client";
import Subscription from "@/components/header and Footer/Subscription";
import FooterLand from "@/components/landing page/header footer landing/FooterLand";
import HeaderLand from "@/components/landing page/header footer landing/HeaderLand";
import { CheckoutProvider } from "../checkout/checkoutContext";
import { SideNavbar } from "@/components/SideNavbar/sideNav";

export default function SubscriptionPage() {

  return (
    <div>

      <CheckoutProvider>
      <HeaderLand />   
      <div className="flex flex-col md:flex-row">
        <SideNavbar />
        <Subscription />
      </div>
      <FooterLand />
      </CheckoutProvider>
      
    </div>
  );
}