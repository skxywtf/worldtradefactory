"use client";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";

const FooterLand = () => {
  return (
    <div className=" h-full w-full pt-40">
      <div className=" w-full md:flex px-20 py-20">
        {/* description */}

        <div className="px-5 w-full">
          <div className=" text-2xl">SKXYWTF</div>
          <div className=" text-sm text-neutral-400 pt-10">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
            minus exercitationem vitae
          </div>
        </div>

        {/* company */}

        <div className="px-5 w-full">
          <div className=" text-2xl">COMPANY</div>
          <div className=" text-neutral-400 text-sm pt-10">
            <div className="pb-3">About Us</div>
            <div className="pb-3">Privacy Policy</div>
            <div className="pb-3">Careers</div>
          </div>
        </div>

        {/* support */}

        <div className="px-5 w-full">
          <div className=" text-2xl">SUPPORT</div>
          <div className=" text-neutral-400 text-sm pt-10">
            <div className="pb-3">Contact Us</div>
            <div className="pb-3">Documentation</div>
            <div className="pb-3">Community</div>
          </div>
        </div>

        {/* socials */}

        <div className="px-5 w-full">
          <div className="text-2xl">SOCIALS</div>
          <div className=" text-xl flex gap-7 pt-10">
            <div>
              <FaFacebook />
            </div>
            <div>
              <FaInstagram />
            </div>
            <div>
              <FaSquareXTwitter />
            </div>
          </div>
        </div>
      </div>
      {/* copyright */}

      <hr />
      <div className=" h-20 items-center w-full flex justify-between px-20">
        <div className=" text-sm text-neutral-400">
          {" "}
          Copyright &copy;2024 - SKXYWTF
        </div>
        <div>
          <Link href="/main" className=" bg-blue-400 px-3 rounded-lg py-2">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FooterLand;
