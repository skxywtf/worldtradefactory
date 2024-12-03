"use client";
import React, { useState } from "react";
// import { SocialIcon } from "react-social-icons";

import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/Sidebar1";
import CareerPage from "../Career";

import {
  FaHome,
  FaChartLine,
  FaRegNewspaper,
  FaFileAlt,
  FaEnvelope,
  FaBell,
} from "react-icons/fa";

export function SidebarDemo1() {
  const links = [
    {
      label: "Home",
      href: "/",
      icon: <FaHome className="mr-3  text-white " />,
    },
    {
      label: "Stocks",
      href: "/main/stock",
      icon: <FaChartLine className="mr-3  text-white " />,
    },
    {
      label: "News",
      href: "#",
      icon: <FaRegNewspaper className="mr-3  text-white  " />,
    },
    {
      label: "Articles",
      href: "#",
      icon: <FaEnvelope className="mr-3  text-white " />,
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row  dark:bg-neutral-800 w-full flex-1   mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden h-[270vh]"
        // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-6 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            {/* <div className="h-20"> */}
            {/* <SidebarLink 
          link={{
            label: "Arshi Khatoon",
            href: "#",
            icon: (
              <Image
                src="https://assets.aceternity.com/manu.png"
                className="h-7 w-7 flex-shrink-0 rounded-full"
                width={50}
                height={50}
                alt="Avatar"
              />
            ),
          }}
        />*/}
            {/* </div> */}
          </div>
        </SidebarBody>
      </Sidebar>
      <CareerPage></CareerPage>
      {/* <Dashboard /> */}
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-0 items-center text-sm text-white py-1 relative z-20"
    >
      <img src="/assets/skxywtflogo.jpeg" height="100px" width="100px"></img>
      {/* <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" /> */}
      {/* </motion.span> */}
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-1 items-center text-sm text-white py-0 relative z-20"
    >
      <img src="/assets/skxywtflogo.jpeg" height="100px" width="200px"></img>
    </Link>
  );
};

// Dummy dashboard component with content
