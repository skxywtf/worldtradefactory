"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";

const HomeFooter = () => {
  const router = useRouter();

  return (
    <div className="h-full w-full bg-black text-white text-left">
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
          <ul className="flex flex-col gap-3 mt-5 text-neutral-400 text-sm pt-5">
              <Link href=''>About Us</Link>
              <Link href=''>Privacy Policy</Link>
              <Link href="/main/career">Career</Link>
          </ul>
        </div>

        {/* support */}

        <div className="px-5 w-full">
          <div className=" text-2xl">SUPPORT</div>
          <ul className="flex flex-col gap-3 mt-5 text-neutral-400 text-sm pt-5">
              <Link href='/main/contact'>Contact Us</Link>
              <Link href=''>Documentation</Link>
              <Link href="">Community</Link>
          </ul>
        </div>

        {/* socials */}

        <div className="px-5 w-full">
          <div className="text-2xl">SOCIALS</div>
          <div className=" text-xl flex gap-7 pt-10">
            <div>
             <FaFacebook className="hover:text-blue-600 transition-colors duration-200 cursor-pointer" />
            </div>
            <div>
              <FaInstagram className="hover:text-pink-500 transition-colors duration-200 cursor-pointer" />
            </div>
            <div>
              <FaSquareXTwitter className="hover:text-blue-200 transition-colors duration-200 cursor-pointer" />
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
          <Link href="/main/login" className=" bg-blue-400 px-3 rounded-lg py-2">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeFooter;
