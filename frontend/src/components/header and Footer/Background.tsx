import React from "react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { Aboreto } from "next/font/google";
import About from "./About";

export function BackgroundGradientAnimationDemo() {
  return (
    <BackgroundGradientAnimation>
    {/* About Us Section */}
<div className="absolute z-50 inset-0 flex justify-center items-center mt-2 text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-6xl">
  <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-black/80 to-black/30">
    About Us
  </p>
</div>

{/* Company Section */}
<div className="absolute z-50 inset-0 flex justify-center items-center mt-24 text-white font-bold px-4 pointer-events-none text-2xl text-center md:text-3xl lg:text-5xl">
  <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/30 tracking-wider leading-relaxed">
    COMPANY
  </p>
</div>

      
    </BackgroundGradientAnimation>
   
  );
}
