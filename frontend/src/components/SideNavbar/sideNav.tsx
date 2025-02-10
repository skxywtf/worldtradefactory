"use client";
import React, { useState } from "react";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { FaHome, FaChartLine, FaRegNewspaper, FaEnvelope } from "react-icons/fa";
import { GoHubot } from "react-icons/go";

import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/Sidebar1";

export function SideNavbar() {
  const links = [
    {
      label: "Home",
      href: "/home",
      icon: <FaHome className="mr-3 text-neutral-700 dark:text-neutral-200 flex-shrink-0" />,
    },
    {
      label: "Stocks",
      href: "/main/stock",
      icon: <FaChartLine className="mr-3 text-neutral-700 dark:text-neutral-200 flex-shrink-0" />,
    },
    {
      label: "News",
      href: "#",
      icon: <FaRegNewspaper className="mr-3 text-neutral-700 dark:text-neutral-200 flex-shrink-0" />,
    },
    {
      label: "Articles",
      href: "#",
      icon: <FaEnvelope className="mr-3 text-neutral-700 dark:text-neutral-200 flex-shrink-0" />,
    },
    {
      label: "StockBot",
      href: "/stockbot",
      icon: <GoHubot className="mr-3 text-neutral-700 dark:text-neutral-200 flex-shrink-0" />,
    },
    {
      label: "Logout",
      href: "/main/login",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "flex flex-col bg-gray-100 md:flex-row dark:bg-black flex-1 mx-auto "
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {/* {open ? <Logo /> : <LogoIcon />} */}
            <div className="mt-6 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
}

export const Logo = () => {
  return (
    <Link href="#"
      className="font-normal flex space-x-0 items-center text-sm text-white py-1 relative z-20"
    >
      <img src="/assets/skxywtflogo.jpeg" height="100px" width="100px"></img>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-1 items-center text-sm text-white py-0 relative z-20"
    >
      <img src="/assets/skxywtflogo.jpeg" height="100px" width="100px"></img>
    </Link>
  );
};