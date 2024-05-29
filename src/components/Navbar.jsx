import React, { useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };

  const [search, setSearch] = useState(true);
  const handleSearch = () => {
    setSearch(!search);
  };
  return (
    <div className="fixed w-full z-20">
      <div className="flex justify-between w-full px-10 lg:px-20 py-5 bg-[#000000fc]">
        <Link
          className={`text-xl lg:text-3xl ${search ? "block" : "hidden"} `}
          to="/"
        >
          {/* {search ? "SKXYWTF" : ""} */}
          SKXYWTF
        </Link>
        <Link
          className={`lg:text-3xl text-[0px] items-center text-center ${
            !search ? "lg:block" : "hidden"
          }  `}
          to="/"
        >
          SKXYWTF
        </Link>

        <div className="flex justify-center items-center gap-5">
          <input
            type="text"
            placeholder="search"
            className={`w-68 lg:w-[600px] text-black ${
              search ? "hidden" : "active:block"
            } rounded-sm ease-in-out duration-1000 p-[2px] lg:p-[6px] px-3`}
          />
          <div onClick={handleSearch}>
            {!search ? (
              <IoClose
                size={24}
                className="menu-icon cursor-pointer"
                onClick={handleSearch}
              />
            ) : (
              <FaSearch
                className="menu-icon cursor-pointer lg:text-2xl"
                onClick={handleSearch}
              />
            )}
          </div>
          {/* <FaSearch
            // ${!search ? "hidden" : "block"}
            className={`cursor-pointer `}
            size={20}
            onClick={handleSearch}
          /> */}
          <button className="px-3 py-1 glow-button hidden md:block rounded-md items-center border text-black bg-orange-500 active:bg-orange-600 text-center">
            <Link to="/signup"> signup</Link>
          </button>
          <div onClick={handleNav}>
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
        className="menu-bar "
        style={{
          width: "100%",
          height: "50%",
          position: "fixed",
          top: 75,
          right: nav ? 0 : "-100%",
          backgroundColor: " rgb(209 213 219)",
          opacity: "1",
          color: "black",
          transition: "right 0.3s ease-in-out",
          display: nav ? "flex" : "none",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="text-center w-full  ">
          <div className="my-4 py-1  hover:bg-gray-400">
            <Link to="/signup" className=" lg:text-2xl">
              Signup
            </Link>
          </div>
          <div className="my-4 py-1  hover:bg-gray-400">
            <Link to="/about" className=" lg:text-2xl">
              {" "}
              About Us
            </Link>
          </div>
          <div className="my-4 py-1  hover:bg-gray-400">
            <Link to="/subscription" className=" lg:text-2xl">
              Subscription
            </Link>
          </div>
          <div className="my-4 py-1  hover:bg-gray-400">
            <Link to="/terms" className=" lg:text-2xl">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
