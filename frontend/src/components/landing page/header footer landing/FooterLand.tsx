"use client";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const FooterLand = () => {

  return (
    <footer className="w-full justify-between bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">
      <div className=" x-auto px-10 md:px-20">
        <div className="grid md:grid-cols-4 gap-10 py-16 border-b border-neutral-200 dark:border-neutral-800">
          {/* Description */}
          <div>
            <h2 className="text-3xl font-bold">SKXYWTF</h2>
            <p className="text-sm text-neutral-700 dark:text-neutral-200 mt-5">
            Skxywtf provides stock price predictions and stock ratings based on past
        market behavior and historical stock performance. Past performance is
        not an indicator of future results. Skxywtf cannot substitute
        professional investment advice.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xl font-semibold">COMPANY</h3>
            <ul className="flex flex-col gap-3 mt-5 text-neutral-800 dark:text-neutral-300">
              <Link href='/main/about'>About Us</Link>
              <Link href='/'>Privacy Policy</Link>
              <Link href="/main/career">Careers</Link>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xl font-semibold">SUPPORT</h3>
            <ul className="flex flex-col gap-2.5 mt-5 text-neutral-800 dark:text-neutral-300">
              <Link href="/main/contact" >Contact Us</Link>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-xl font-semibold">SOCIALS</h3>
            <div className="flex space-x-5 mt-5 text-2xl">
              <FaFacebook className="hover:text-blue-600 transition-colors duration-200" />
              <FaInstagram className="hover:text-pink-500 transition-colors duration-200" />
              <FaTwitter className="hover:text-blue-400 transition-colors duration-200" />
            </div>
          </div>
        </div>

        {/* Copyright and CTA */}
        <div className="flex flex-col md:flex-row justify-between items-center py-6">
          <p className="text-sm text-neutral-500 dark:text-neutral-300">
            Copyright &copy; 2024 - SKXYWTF
          </p>
          <Link
            href="/main/login"
            className="mt-4 md:mt-0 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition-colors duration-200"
          >
            Get Started
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default FooterLand;
