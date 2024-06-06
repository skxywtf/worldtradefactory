import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

// Import images directly
import globalTrade1 from "../../assets/globalTrade1.jpg";
import globalTrade2 from "../../assets/globalTrade2.jpg";
import tradeGlobe from "../../assets/tradeGlobe.avif";

const MainSearch = () => {
  const backgroundImages = [
    globalTrade1,
    globalTrade2,
    tradeGlobe,
    // Add more imported images as needed
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 10000); // Change image every 10 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [backgroundImages.length]);

  const currentImage = backgroundImages[currentImageIndex];
  return (
    <div
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${currentImage})`,
      }}
      className="h-full w-full pt-20 fit transition dark:text-white"
    >
      <h1 className="w-full cursor-default text-3xl lg:text-5xl pt-20 pb-10 text-center flex flex-wrap justify-center items-center">
        Empower Your Financial Future With
      </h1>
      <h1 className="w-full cursor-default justify-center text-3xl lg:text-5xl pb-20 text-center">
        World Trade Factory
      </h1>
      <div className="w-full h-10 flex justify-center">
        <form action="submit" className="h-full items-center md:w-1/3 w-[60%]">
          <input
            type="text"
            placeholder="search stocks"
            className="px-5 h-full dark:text-black items-center w-full border-2 border-teal-600 text-black rounded-md"
          />
        </form>
      </div>
      <br />
      <div className="flex pb-40 justify-center gap-2 lg:gap-4 lg:text-xl">
        <div className="">popular stocks :</div>
        <Link className="underline hover:text-blue-700" to="/stock">
          GOOG
        </Link>
        <Link className="underline hover:text-blue-700" to="/stock">
          META
        </Link>
        <Link className="underline hover:text-blue-700" to="/stock">
          MICR
        </Link>
        <Link className="underline hover:text-blue-700" to="/stock">
          META
        </Link>
        <Link
          className="hidden lg:block underline hover:text-blue-700"
          to="/stock"
        >
          GOOG
        </Link>
        <Link
          className="hidden lg:block underline hover:text-blue-700"
          to="/stock"
        >
          MICR
        </Link>
      </div>
    </div>
  );
};

export default MainSearch;
