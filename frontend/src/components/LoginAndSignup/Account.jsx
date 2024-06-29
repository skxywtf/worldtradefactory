import React, { useEffect, useState } from "react";
import Navbar from "../header and Footer/Navbar";
import { Link } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { CiLight } from "react-icons/ci";
import { MdOutlineDarkMode } from "react-icons/md";
import ForexCrossRates from "../embeded codes/ForexCrossRates";
import Screener from "../embeded codes/Screener";
import CryptoMarket from "../embeded codes/CryptoMarket";
import TechnicalAnalysis from "../embeded codes/TechnicalAnalysis";
import SymbolInfo from "../embeded codes/SymbolInfo";
import CryptoCoinHeatMap from "../embeded codes/HeatMaps/CryptoCoinHeatMap";
import ETFHeatMap from "../embeded codes/HeatMaps/ETFHeatMap";
import ForexHeatMap from "../embeded codes/HeatMaps/ForexHeatMap";
import StockHeatMap from "../embeded codes/HeatMaps/StockHeatMap";
import AdvanceRealTime from "../embeded codes/Advance widgets/AdvanceRealTime";
import SymbolOverview from "../embeded codes/Advance widgets/SymbolOverview";
import MiniChart from "../embeded codes/Advance widgets/MiniChart";
import EconomicCalendar from "../embeded codes/Advance widgets/EconomicCalendar";
import TopStories from "../embeded codes/Advance widgets/TopStories";
import CompanyProfile from "../embeded codes/other widgets/CompanyProfile";
import FundamentalData from "../embeded codes/other widgets/FundamentalData";
import MarketData from "../embeded codes/other widgets/MarketData";
import StockMarketWidget from "../embeded codes/other widgets/StockMarketWidget";
import TickerTape from "../embeded codes/other widgets/TickerTape";

const Account = () => {
  const [nav, setNav] = useState(false);
  const [search, setSearch] = useState(true);
  const [navbarBackground, setNavbarBackground] = useState(false);
  const [dark, setDark] = useState(localStorage.getItem("theme") === "dark");

  const handleNav = () => {
    setNav(!nav);
  };

  const handleSearch = () => {
    setSearch(!search);
  };

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const toggleTheme = () => {
    setDark(!dark);
  };
  return (
    <div className=" h-full w-full">
      <div className="fixed w-full z-20 border-b  dark:text-white ">
        <div>
          <div className="flex h-full items-center justify-between w-full px-10 lg:px-20 py-5">
            <Link
              className={`text-2xl   items-center text-center lg:text-3xl ${
                search ? "block" : "hidden"
              } `}
              to="/"
            >
              SKXYWTF
            </Link>
            <Link
              className={`lg:text-3xl   text-[0px] items-center text-center ${
                !search ? "lg:block" : "hidden"
              }  `}
              to="/"
            >
              SKXYWTF
            </Link>

            <div className="flex justify-center items-center gap-5">
              <div
                className={` ${
                  navbarBackground ? "flex" : "hidden"
                } transition duration-1000`}
              >
                <input
                  type="text"
                  placeholder="search"
                  className={`w-68 lg:w-[600px] text-black rounded-sm  p-[1px] lg:p-[6px] px-3 search-input ${
                    search ? "search-input" : "search-input-active"
                  }`}
                />
                <div
                  onClick={handleSearch}
                  className="rounded-full p-1 text-xl hover:bg-[rgba(80,77,77,0.55)]"
                >
                  {!search ? (
                    <IoClose
                      size={24}
                      className="menu-icon  cursor-pointer text-2xl"
                      onClick={handleSearch}
                    />
                  ) : (
                    <IoIosSearch
                      className="menu-icon cursor-pointer  text-3xl"
                      onClick={handleSearch}
                    />
                  )}
                </div>
              </div>
              <Link
                to="/account"
                className="text-2xl p-2 rounded-full hover:bg-[rgba(80,77,77,0.55)]"
              >
                <CgProfile />
              </Link>
              <div
                className="rounded-full p-2 text-xl lg:text-2xl hover:bg-[rgba(80,77,77,0.55)]"
                onClick={toggleTheme}
              >
                {dark ? (
                  <CiLight size={24} className=" cursor-pointer" />
                ) : (
                  <MdOutlineDarkMode
                    size={24}
                    className=" cursor-pointer lg:text-3xl"
                  />
                )}
              </div>

              <div
                className="rounded-full p-2 text-xl lg:text-2xl hover:bg-[rgba(80,77,77,0.55)]"
                onClick={handleNav}
              >
                {nav ? (
                  <IoClose size={24} className="menu-icon cursor-pointer" />
                ) : (
                  <IoMenu
                    size={24}
                    className="menu-icon cursor-pointer lg:text-3xl"
                  />
                )}
              </div>
            </div>
          </div>
          <div
            className="menu-bar w-full h-full md:h-[60%] md:w-1/2 lg:w-1/3 md:mr-20 md:rounded-lg bg-gray-800 py-10"
            style={{
              position: "fixed",
              top: 75,
              right: nav ? 0 : "-100%",
              opacity: "1",
              color: "black",
              transition: "right 0.3s ease-in-out",
              display: nav ? "flex" : "none",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="text-center w-full px-10">
              <div className="my-4 py-1 rounded  hover:bg-gray-700 ">
                <Link to="/signup" className="md:text-xl lg:text-2xl">
                  Signup
                </Link>
              </div>
              <hr />
              <div className="my-4 py-1 rounded  hover:bg-gray-700 ">
                <Link to="/about" className="md:text-xl  lg:text-2xl">
                  About Us
                </Link>
              </div>
              <hr />
              <div className="my-4 py-1 rounded  hover:bg-gray-700 ">
                <Link to="/subscription" className="md:text-xl  lg:text-2xl">
                  Subscription
                </Link>
              </div>
              <hr />
              <div className="my-4 py-1 rounded  hover:bg-gray-700 ">
                <Link to="/terms" className="md:text-xl  lg:text-2xl">
                  Terms & Conditions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" h-screen w-full flex justify-center items-center text-3xl">
        <div>
          {/* <ForexCrossRates /> */}
          {/* <Screener /> */}
          {/* <CryptoMarket /> */}
          {/* <TechnicalAnalysis /> */}
          {/* <SymbolInfo /> */}
          <CryptoCoinHeatMap />
          {/* <ETFHeatMap /> */}
          {/* <ForexHeatMap /> */}
          {/* <StockHeatMap /> */}
          {/* <AdvanceRealTime /> */}
          {/* <SymbolOverview /> */}
          {/* <MiniChart /> */}
          {/* <EconomicCalendar /> */}
          {/* <TopStories /> */}
          {/* <CompanyProfile /> */}
          {/* <FundamentalData /> */}
          {/* <MarketData /> */}
          {/* <StockMarketWidget /> */}
          {/* <TickerTape /> */}
        </div>
      </div>
    </div>
  );
};

export default Account;
