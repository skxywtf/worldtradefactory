"use client";
import React, { useEffect, useState, MouseEvent } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdOutlineDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import Link from "next/link";

const Navbar: React.FC = () => {
  const [nav, setNav] = useState<boolean>(false);
  const [search, setSearch] = useState<boolean>(true);
  const [navbarBackground, setNavbarBackground] = useState<boolean>(false);
  const [dark, setDark] = useState<boolean>(localStorage.getItem("theme") === "dark");

  const handleNav = (): void => {
    setNav(!nav);
  };

  const handleSearch = (): void => {
    setSearch(!search);
  };

  const changeBackground = (): void => {
    if (window.scrollY >= 600) {
      setNavbarBackground(true);
    } else {
      setNavbarBackground(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const toggleTheme = (e: MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setDark(!dark);
    // onThemeChange();
  };

  return (
    <div className="fixed w-full z-20 dark:text-white">
      <div className={navbarBackground ? "navbar active" : "navbar"}>
        <div className="flex h-full items-center justify-between w-full px-10 lg:px-20 py-5">
          <Link
            className={`text-2xl items-center text-center lg:text-3xl ${
              search ? "block" : "hidden"
            }`}
            href="/main"
          >
            SKXYWTF
          </Link>
          <Link
            className={`lg:text-3xl text-[0px] items-center text-center ${
              !search ? "lg:block" : "hidden"
            }`}
            href="/main"
          >
            SKXYWTF
          </Link>

          <div className="flex justify-center items-center gap-5">
            <div
              className={`${
                navbarBackground ? "flex" : "hidden"
              } transition duration-1000`}
            >
              <input
                type="text"
                placeholder="search"
                className={`w-68 lg:w-[600px] text-black rounded-sm p-[1px] lg:p-[6px] px-3 search-input ${
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
                    className="menu-icon cursor-pointer text-2xl"
                    onClick={handleSearch}
                  />
                ) : (
                  <IoIosSearch
                    className="menu-icon cursor-pointer text-3xl"
                    onClick={handleSearch}
                  />
                )}
              </div>
            </div>
            <Link
              href="/main/signup"
              className="text-2xl p-2 rounded-full hover:bg-[rgba(80,77,77,0.55)]"
            >
              <CgProfile />
            </Link>
            <div
              className="rounded-full p-2 text-xl lg:text-2xl hover:bg-[rgba(80,77,77,0.55)]"
              onClick={toggleTheme}
            >
              {dark ? (
                <CiLight size={24} className="cursor-pointer" />
              ) : (
                <MdOutlineDarkMode
                  size={24}
                  className="cursor-pointer lg:text-3xl"
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
            color: "white",
            transition: "right 0.3s ease-in-out",
            display: nav ? "flex" : "none",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="text-center w-full px-10">
            <div className="my-4 py-1 rounded hover:bg-gray-700">
              <Link href="/main/signup" className="md:text-xl lg:text-2xl">
                Signup
              </Link>
            </div>
            <hr />
            <div className="my-4 py-1 rounded hover:bg-gray-700">
              <Link href="/main/about" className="md:text-xl lg:text-2xl">
                About Us
              </Link>
            </div>
            <hr />
            <div className="my-4 py-1 rounded hover:bg-gray-700">
              <Link
                href="/main/subscription"
                className="md:text-xl lg:text-2xl"
              >
                Subscription
              </Link>
            </div>
            <hr />
            <div className="my-4 py-1 rounded hover:bg-gray-700">
              <Link href="/main/terms" className="md:text-xl lg:text-2xl">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
