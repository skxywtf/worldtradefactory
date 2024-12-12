"use client";

import dynamic from "next/dynamic";
import React from "react";

// Dynamically import the AdvanceRealTime component
const AdvanceRealTime = dynamic(() => import("@/components/embeded codes/Advance widgets/AdvanceRealTime"), {
  ssr: false, // This ensures it's only rendered on the client side
});

const StockPage: React.FC = () => {
  return (
    <div className="h-screen w-screen">
      {/* <h1 className="text-center text-white text-2xl mb-4">Stock Widget</h1> */}
      <AdvanceRealTime />
    </div>
  );
};

export default StockPage;