"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import globalTrade1 from "../../assets/globalTrade1.jpg";
import globalTrade2 from "../../assets/globalTrade2.jpg";
import { StaticImageData } from "next/image"; // Import StaticImageData type
import CompanyProfile from "../embeded codes/other widgets/CompanyProfile";
import SymbolInfo from "../embeded codes/SymbolInfo";

const MainSearch: React.FC = () => {
  // Use StaticImageData type for the background images
  const backgroundImages: StaticImageData[] = [
    globalTrade1,
    globalTrade2,
    // Add more imported images as needed
  ];

  const navigate = useRouter();
  const [searchInput, setSearchInput] = useState<string>("");
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("searchInput", searchInput);
    // Uncomment if needed
    // navigate("/stock");
  };

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
        backgroundImage: `url(${currentImage.src})`, // Access src property of StaticImageData
      }}
      className="h-full w-full pt-20 fit transition dark:text-black"
    >
      <h1 className="w-full cursor-default text-3xl lg:text-5xl pt-20 pb-10 text-center flex flex-wrap justify-center items-center">
        Empower Your Financial Future With
      </h1>
      <h1 className="w-full cursor-default justify-center text-3xl lg:text-5xl pb-20 text-center">
        World Trade Factory
      </h1>
      <div className="md:flex md:w-full">
        <div>
          <div className="w-full h-10 flex justify-center md:justify-start md:px-20">
            <form
              onSubmit={handleSubmit}
              className="h-full items-center"
            >
              <input
                type="text"
                placeholder="search stocks"
                className="px-5 h-full dark:text-black md:w-100 items-center w-full border-2 border-teal-600 text-black rounded-md"
                onChange={(e) => {
                  setSearchInput(e.target.value);
                }}
              />
            </form>
          </div>
          <br />
          <div className="flex pb-40 justify-center md:justify-start md:px-20 gap-2 lg:gap-4 lg:text-xl">
            <div className="">popular stocks :</div>
            <Link className="underline hover:text-blue-700" href="/main/stock">
              GOOG
            </Link>
            <Link className="underline hover:text-blue-700" href="/main/stock">
              META
            </Link>
            <Link className="underline hover:text-blue-700" href="/main/stock">
              MICR
            </Link>
            <Link className="underline hover:text-blue-700" href="/main/stock">
              META
            </Link>
            {/* <Link
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
            </Link> */}
          </div>
        </div>
        <div className="hidden md:block h-40 w-1/2 rounded-lg bg-white text-black">
          {/* <CompanyProfile /> */}
          <Link href="/main/stock">
            <SymbolInfo searchInputValue={searchInput} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainSearch;
