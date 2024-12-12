import HeaderLand from "./header footer landing/HeaderLand";
import TickerTape from "../embeded codes/other widgets/TickerTape";
import MainCOntentLand from "./ContentLand Page/MainCOntentLand";
import FooterLand from "./header footer landing/FooterLand";
import { useTheme } from 'next-themes'

const LandingPage = () => {
  const { theme  } = useTheme();
  
  return (
    <div>
      <HeaderLand />

      <div className="w-full">
        <TickerTape />
      </div>
      <MainCOntentLand />
      <FooterLand />
    </div>
  );
};

export default LandingPage;
