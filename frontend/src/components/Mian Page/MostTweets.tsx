"use client";

import { useRef } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Graph from "../Stock Page/Graph";

// Define a type for the Graph component props if needed
// You can import or define the actual props type for Graph if available
interface GraphProps {
  symbol: string;
  id: string;
}

const MostTweets: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 500;
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 500;
    }
  };

  return (
    <div className="">
      <h1 className="mt-10 text-3xl pl-14">Energy Futures{">"}</h1>
      <div className="relative flex items-center py-20 px-3">
        <MdChevronLeft
          className="opacity-50 rounded-full dark:bg-gray-200 bg-gray-800 cursor-pointer hover:opacity-100"
          onClick={slideLeft}
          size={40}
        />

        <div
          ref={sliderRef}
          id="slider1"
          className="w-full h-full overflow-x-scroll flex gap-3 whitespace-nowrap scroll-smooth scrollbar-hide"
          style={{ display: "flex", overflowX: "scroll", whiteSpace: "nowrap" }}
        >
          <div className="flex gap-3">
            <div className="flex-shrink-0" style={{ width: "350px" }}>
              <Graph symbol="A9N1!" id="graph-40" />
            </div>
            <div className="flex-shrink-0" style={{ width: "350px" }}>
              <Graph symbol="VOO" id="graph-41" />
            </div>
            <div className="flex-shrink-0" style={{ width: "350px" }}>
              <Graph symbol="IVV" id="graph-42" />
            </div>
            <div className="flex-shrink-0" style={{ width: "350px" }}>
              <Graph symbol="VTI" id="graph-43" />
            </div>
            <div className="flex-shrink-0" style={{ width: "350px" }}>
              <Graph symbol="QQQ" id="graph-44" />
            </div>
            <div className="flex-shrink-0" style={{ width: "350px" }}>
              <Graph symbol="IJH" id="graph-45" />
            </div>
            <div className="flex-shrink-0" style={{ width: "350px" }}>
              <Graph symbol="VEA" id="graph-46" />
            </div>
            <div className="flex-shrink-0" style={{ width: "350px" }}>
              <Graph symbol="VUG" id="graph-47" />
            </div>
            <div className="flex-shrink-0" style={{ width: "350px" }}>
              <Graph symbol="IEFA" id="graph-48" />
            </div>
            <div className="flex-shrink-0" style={{ width: "350px" }}>
              <Graph symbol="VTV" id="graph-49" />
            </div>
          </div>
        </div>

        <MdChevronRight
          className="opacity-50 rounded-full dark:bg-gray-300 bg-gray-800 cursor-pointer hover:opacity-100"
          onClick={slideRight}
          size={40}
        />
      </div>
    </div>
  );
};

export default MostTweets;
