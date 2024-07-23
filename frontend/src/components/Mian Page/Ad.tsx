import React from "react";
import Image from "next/image"; // Use `next/image` for optimized images
import Apple from "../../assets/appleLogo.png";
import Google from "../../assets/googleLogo.webp";
import Microsoft from "../../assets/microsoftLogo.png";
import Link from "next/link";

const Ad: React.FC = () => {
  return (
    <div className="h-40 w-full bg-gradient-to-r from-red-900 py-10 rounded-lg">
      <div className="flex lg:pl-20 h-full w-full justify-between items-center">
        <div className="text-2xl px-3">
          <div className="py-2">SKXYWTF</div>
          <button className="bg-orange-500 py-1 text-black glow-button border p-1 rounded-lg">
            Signup
          </button>
        </div>
        <div className="flex justify-center items-center w-full gap-5 overflow-x-hidden">
          <Link href="/main/stock" className="h-24 w-24 lg:h-32 lg:w-36 bg-teal-200">
            <Image src={Apple} className="h-full w-full" alt="Apple logo" />
          </Link>
          <Link href="/main/stock" className="h-24 w-24 lg:h-32 lg:w-36 bg-teal-200">
            <Image src={Google} className="h-full w-full" alt="Google logo" />
          </Link>
          <Link href="/main/stock" className="h-24 w-24 lg:h-32 lg:w-36 bg-teal-200">
            <Image src={Microsoft} className="h-full w-full" alt="Microsoft logo" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Ad;
