"use client";

import { SidebarDemo1 } from "@/components/header and Footer/Career/Career_A";
import Footer from "@/components/header and Footer/Footer";
// import FooterLand from "./header footer landing/FooterLand";
import FooterLand from "@/components/landing page/header footer landing/FooterLand";

export default function AboutPage() {
  return (
    <>
      <SidebarDemo1></SidebarDemo1>

      {/* old footer  */}
      {/* <Footer></Footer>        */}

      <FooterLand />
    </>
  );
}