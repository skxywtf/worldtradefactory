"use client";
import { motion } from "framer-motion";
import HeaderLand from "@/components/landing page/header footer landing/HeaderLand";
import FooterLand from "@/components/landing page/header footer landing/FooterLand";

import { AppleCardsCarousel } from "./Team_card";
import { CareerCard } from "./Career/Card";
import { CardStackN } from "./Career/Card-stack";

const CareerPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white border-black">
      {/* Header */}
      <HeaderLand />
      <div className="flex justify-start min-h-screen bg-black text-white">
        <h1 className="text-White text-5xl relative top-8  ml-11 flex start-0">
          Career
        </h1>
        <div className="ml-0 mt-11  relative top-11">
          <p className="h-[50vh] w-96">
            StockEdge, a stock market analytics platform, is currently hiring
            for roles in tech development, research, marketing, and sales. They
            emphasize a growth-oriented work environment and provide
            opportunities for professional development. Vanguard, a leader in
            investment management, also offers various positions, including
            roles in financial advisory and technology. Both companies encourage
            learning and career growth, making them great options for pursuing
            stock-related opportunities StockEdge is actively hiring for roles
            in tech development, research, marketing, and sales, emphasizing a
            collaborative environment that fosters growth and learning. They
            value creativity and innovation, encouraging employees to explore
            different responsibilities to expand their skill sets. Similarly,
            Vanguard, a global investment leader, is offering a variety of
            positions in financial advisory, data analytics, and technology.
            Both companies provide supportive work environments focused on
            career development and continuous learning​
          </p>
        </div>
        <CardStackN></CardStackN>
      </div>

      {/* Main Content */}
      <div className="flex-grow px-10 py-10 text-center">
        {/* Dynamic Intro Line */}
        {/* <motion.h1
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-5xl font-bold mb-12"
        >
          Join us and shape the future of trading
        </motion.h1> */}
        <motion.h1
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-5xl font-bold relative bottom-0 text-grey-500 animate-pulse"
        >
          Join Us and Shape the Future of Trading
        </motion.h1>
        <CareerCard></CareerCard>
        <FooterLand />
        {/* <motion.h1 
  initial={{ x: -100, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ duration: 1 }}
  className="text-5xl font-bold mb-12 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
    Join Us and Shape the Future of Trading
</motion.h1> */}
        {/* <motion.h1 
  initial={{ x: -100, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ duration: 1 }}
  className="text-5xl font-bold mb-12 text-white hover:text-yellow-300 transition-all duration-300">
    Join Us and Shape the Future of Trading
</motion.h1> */}

        {/* Tiles for Job Categories */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8"> 
          {/* Frontend Team Tile 
          <div className="bg-gray-800 p-12 rounded-lg text-center hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-bold mb-4 text-green-500">
              Frontend Team
            </h2>
            <p className="text-lg mb-6 text-gray-300">
              Be a part of crafting intuitive and cutting-edge user experiences.
            </p>
            <button className="bg-green-500 text-black py-2 px-4 rounded hover:bg-green-400 transition-colors">
              Learn More
            </button>
          </div>

          {/* Backend Team Tile 
          <div className="bg-gray-800 p-12 rounded-lg text-center hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-bold mb-4 text-green-500">
              Backend Team
            </h2>
            <p className="text-lg mb-6 text-gray-300">
              Work on building scalable and secure backend systems.
            </p>
            <button className="bg-green-500 text-black py-2 px-4 rounded hover:bg-green-400 transition-colors">
              Learn More
            </button>
          </div>

          {/* AI Team Tile 
          <div className="bg-gray-800 p-12 rounded-lg text-center hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-bold mb-4 text-green-500">AI Team</h2>
            <p className="text-lg mb-6 text-gray-300">
              Innovate in the world of AI, pushing the boundaries of trading
              automation.
            </p>
            <button className="bg-green-500 text-black py-2 px-4 rounded hover:bg-green-400 transition-colors">
              Learn More
            </button>
          </div>
        </div>*/}
      </div>

      {/* Footer */}
    </div>
  );
};

export default CareerPage;
