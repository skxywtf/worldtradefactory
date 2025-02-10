"use client";

import { StickyScrollRevealDemo } from "@/components/header and Footer/HeroSection";
import { ImagesSliderDemo } from "@/components/header and Footer/ImageSlider";
import JoinUs from "@/components/header and Footer/Joinus";
import { AppleCardsCarousel } from "@/components/header and Footer/Team_card";
import FooterLand from "@/components/landing page/header footer landing/FooterLand";
import HeaderLand from "@/components/landing page/header footer landing/HeaderLand";
import { SideNavbar } from "@/components/SideNavbar/sideNav";

export default function AboutPage() {
  return (
    <div>
      <HeaderLand></HeaderLand>
     <div className="flex flex-col md:flex-row">
      <SideNavbar />
      <div className="w-full overflow-hidden">
      <div className="border-2 m-0 rounded-xl border-slate-400 p-3 bg-slate-200 dark:bg-black dark:border-black">
      <ImagesSliderDemo></ImagesSliderDemo>
      </div>

      <StickyScrollRevealDemo></StickyScrollRevealDemo>
      <AppleCardsCarousel></AppleCardsCarousel>
      <JoinUs></JoinUs>
      </div>
     </div>

      <FooterLand></FooterLand>
    </div>
  );
}
