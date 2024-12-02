"use client";
import React from "react";
import { StickyScroll } from "../ui/sticky-scroll-reveal";
import Image from "next/image";

const content = [
  {
    title: "Our Mission",
    description:
    'Our mission is to create high-quality products that help individuals and businesses succeed. We focus on reliability, usability, and providing tools that empower users to achieve their goals effectively and efficiency',
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white lg:text-3xl">
        Our mission
        
      </div>
    ),
  },
  {
    title: "Vision",
    description:
      "We envision a world where technology seamlessly integrates into everyday life, driving positive change and progress..",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src="/assets/globalTrade2.jpg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Purpose",
    description:
      "Committed to improve the financial well-being of people means that our focus is on helping individuals achieve better financial stability, security, and growth. This could involve offering tools, services, or products that help people manage their money more effectively Our commitment reflects a long-term goal to positively impact people's financial health, reducing their financial stress and helping them reach their personal or business finan In essence, we aim to empower people to take control of their finances and improve their quality of life through our solutions.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white lg:text-3xl">
        Our Purpose
      </div>
    ),
  },
  {
    title: "Core Values",
    description:
      "SKXYWTF is committed to core values - Integrity, Customer Focused Culture, Trust, Respect and Care for the Individual, Passion for Excellence, Teamwork..",
    content: (
      
        <div className="h-full w-full  flex items-center justify-center text-white">
          <Image
            src="/assets/corevalue.jpg"
            width={300}
            height={300}
            className="h-full w-full object-cover"
            alt="linear board demo"
          />
        </div>
      
    ),
  },
];
export function StickyScrollRevealDemo() {
  return (
    <div className="p-13">
      <StickyScroll content={content} />
    </div>
  );
}
