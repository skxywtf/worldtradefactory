import React from "react";
import HeaderLand from "./header footer landing/HeaderLand";
import TickerTape from "../embeded codes/other widgets/TickerTape";
import MainCOntentLand from "./ContentLand Page/MainCOntentLand";
import FooterLand from "./header footer landing/FooterLand";

const LandingPage = () => {
  return (
    <div className=" h-full w-full bg-black text-white">
      <HeaderLand />
      <div></div>
      <div className=" w-full ">
        <TickerTape />
      </div>
      <MainCOntentLand />
      <FooterLand />
    </div>
  );
};

export default LandingPage;
