"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <div className=" w-full border-t h-80 lg:h-72  bg-black text-white">
      <div className="flex justify-between pt-10 px-5">
        <Link href="/" className="text-2xl">
          SKXYWTF
        </Link>
        <div className="flex gap-7">
          <Link href="/contact" className="underline">
            Contact us
          </Link>
          <Link href="/subscription" className="underline">
            Subscription
          </Link>
          <Link href="/about" className="underline">
            About Us
          </Link>
        </div>
      </div>
      {/*  */}
      <div className="py-10 px-5 text-gray-400">
        Skxywtf provides stock price predictions and stock ratings based on past
        market behavior and historical stock performance. Past performance is
        not an indicator of future results. Skxywtf cannot substitute
        professional investment advice.
      </div>
      {/*  */}
      <div className="flex justify-between  px-5">
        <Link href="/terms" className="underline text-gray-400">
          Terms and use
        </Link>
        <div className="text-gray-400">&copy;2024 Skxywtf</div>
      </div>
    </div>
  );
};

export default Footer;
