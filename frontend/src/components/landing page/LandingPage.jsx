import React from "react";
import HeaderLand from "./header footer landing/HeaderLand";
import TickerTape from "../embeded codes/other widgets/TickerTape";

const LandingPage = () => {
  return (
    <div className=" h-full w-full bg-black text-white">
      <HeaderLand />
      <div></div>
      <TickerTape />
    </div>
  );
};

export default LandingPage;
