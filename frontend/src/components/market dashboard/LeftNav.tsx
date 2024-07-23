import Link from "next/link";
import { TiHome } from "react-icons/ti";
import { HiMiniComputerDesktop } from "react-icons/hi2";
import { IoMdPie } from "react-icons/io";
import { RiStockFill } from "react-icons/ri";
import { AiOutlineDollar } from "react-icons/ai";
import { LuNewspaper } from "react-icons/lu";
import { MdRateReview } from "react-icons/md";

export default function LeftNav() {
  return (
    <div className=" h-screen fixed w-[35%] md:w-[20%] bg-neutral-900">
      <div className=" h-full w-full px-3">
        <div className=" w-full text-2xl py-5 cursor-default">SKXYWTF</div>
        <div className=" w-full pt-2 pb-4 px-1 text-sm">Menu</div>
        <div className=" w-full ">
          <Link
            href="/market-dashboard"
            className=" w-full  block rounded-md focus:text-teal-400 focus:bg-neutral-700 my-[2px] py-2"
          >
            <div className="px-1 flex items-center">
              <span className="px-1">
                <TiHome />
              </span>
              &nbsp;Dashboard
            </div>
          </Link>

          <Link
            href="/market-dashboard/market-update"
            className=" w-full block my-[2px] rounded-md focus:text-teal-400 focus:bg-neutral-700 py-2"
          >
            <div className="px-1 flex items-center">
              <span className="px-1">
                <HiMiniComputerDesktop />
              </span>
              &nbsp;Market update
            </div>
          </Link>

          <Link
            href="/market-dashboard/income-estimator"
            className=" w-full block my-[2px] rounded-md focus:text-teal-400 focus:bg-neutral-700 py-2"
          >
            <div className="px-1 flex items-center">
              <span className="px-1">
                <IoMdPie />
              </span>
              &nbsp;Income estimator
            </div>
          </Link>

          <Link
            href="/market-dashboard/charts"
            className=" w-full block my-[2px] rounded-md focus:text-teal-400 focus:bg-neutral-700 py-2"
          >
            <div className="px-1 flex items-center">
              <span className="px-1">
                <RiStockFill />
              </span>
              &nbsp;Interactive charts
            </div>
          </Link>

          <Link
            href="/market-dashboard/mutual-funds"
            className=" w-full block my-[2px] rounded-md focus:text-teal-400 focus:bg-neutral-700 py-2"
          >
            <div className="px-1 flex items-center">
              <span className="px-1">
                <AiOutlineDollar />
              </span>
              &nbsp;Mutual funds
            </div>
          </Link>
        </div>
        <div className=" w-full text-sm py-4 p-1">More</div>
        <div className=" w-full ">
          <Link
            href="/market-dashboard/news"
            className=" w-full block  my-[2px] rounded-md focus:text-teal-400 focus:bg-neutral-700 py-2"
          >
            <div className="px-1 flex items-center">
              <span className="px-1">
                <LuNewspaper />
              </span>
              &nbsp;News
            </div>
          </Link>

          <Link
            href="/market-dashboard/feedback"
            className=" w-full block my-[2px] rounded-md focus:text-teal-400 focus:bg-neutral-700 py-2"
          >
            <div className="px-1 flex items-center">
              <span className="px-1">
                <MdRateReview />
              </span>
              &nbsp;Feedback
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
