"use client";
import { motion } from "framer-motion";
import HeaderLand from "@/components/landing page/header footer landing/HeaderLand";
import FooterLand from "@/components/landing page/header footer landing/FooterLand";

import { CareerCard } from "./Career/Card";
import { CardStackN } from "./Career/Card-stack";

const CareerPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">

      <HeaderLand />

      <div className="flex min-h-screen bg-white text-black dark:bg-black dark:text-white">
       <div className="w-4/5 mx-14 py-4">

        <p className="text-White text-5xl"> Career </p>
        <p className="py-6 text-center text-lg">
          StockEdge, a stock market analytics platform, is currently hiring for roles in tech development, research, marketing, and sales. They emphasize a growth-oriented work environment and provide opportunities for professional development.
          Vanguard, a leader in investment management, also offers various positions, including roles in financial advisory and technology. Both companies encourage learning and career growth, making them great options for pursuing stock-related opportunities. StockEdge is actively hiring for roles in tech development, research, marketing, and sales, emphasizing a collaborative environment that fosters growth and learning. They value creativity and innovation, encouraging employees to explore different responsibilities to expand their skill sets. Similarly, Vanguard, a global investment leader, is offering a variety of positions in financial advisory, data analytics, and technology. Both companies provide supportive work environments focused on career development and continuous learning.
          </p>
        </div>

        <CardStackN></CardStackN>

      </div>

      <div className="flex-grow px-10 py-10 text-center bg-white dark:bg-black">
 
        <motion.h1
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-5xl font-bold text-gray-600 dark:text-grey-400 animate-pulse"
        >
          Join Us and Shape the Future of Trading
        </motion.h1>
        <CareerCard></CareerCard>
        <FooterLand />
       
      </div>
    </div>
  );
};

export default CareerPage;