"use client";

// import About from "@/components/header and Footer/About";
// import { BackgroundGradientAnimationDemo } from "@/components/header and Footer/Background";
import Footer from "@/components/header and Footer/Footer";
import { StickyScrollRevealDemo } from "@/components/header and Footer/HeroSection";
import { ImagesSliderDemo } from "@/components/header and Footer/ImageSlider";
import JoinUs from "@/components/header and Footer/Joinus";
import Navbar from "@/components/header and Footer/Navbar";
// import Navbar from "@/components/header and Footer/Navbar";

// import AppAppBar from "@/components/header and Footer/Navbar1";
import { AppleCardsCarousel } from "@/components/header and Footer/Team_card";
import FooterLand from "@/components/landing page/header footer landing/FooterLand";
import HeaderLand from "@/components/landing page/header footer landing/HeaderLand";
// import { BackgroundGradientAnimation } from "@/components/ui/background-gradien/t-animation";

// import Contact1 from "@/components/header and Footer/Contact1";
// import CareerPage from "@/components/header and Footer/Career";
// import SidebarDemo from "@/components/Sidebar";
// import { SidebarDemo1 } from "@/components/header and Footer/Career/Career_A";

export default function AboutPage() {
  return (
    <div>
      {/* <Navbar></Navbar> */}
      <HeaderLand></HeaderLand>
      
      <div className="border-2 m-2 rounded-xl border-slate-400 p-3 bg-slate-200 dark:bg-black dark:border-black">
      <ImagesSliderDemo></ImagesSliderDemo>
      </div>

      <StickyScrollRevealDemo></StickyScrollRevealDemo>
      <AppleCardsCarousel></AppleCardsCarousel>
      <JoinUs></JoinUs>
      <FooterLand></FooterLand>
      {/* <About></About> */}
      {/* <Contact1></Contact1> */}
      {/* <CareerPage></CareerPage> */}
      {/* <SidebarDemo1></SidebarDemo1> */}
    </div>
  );
}
