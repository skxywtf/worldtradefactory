import HeaderLand from "./header footer landing/HeaderLand";
import TickerTape from "../embeded codes/other widgets/TickerTape";
import MainCOntentLand from "./ContentLand Page/MainCOntentLand";
import FooterLand from "./header footer landing/FooterLand";

const LandingPage = () => {
  
  return (
    <div>
      <HeaderLand />

      <TickerTape />
      <MainCOntentLand />

      <FooterLand />
    </div>
  );
};

export default LandingPage;
