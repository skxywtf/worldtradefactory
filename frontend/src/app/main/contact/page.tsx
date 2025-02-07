import { ContactSidebar } from "@/components/header and Footer/Career/Contact_sidebar";
// import Footer from "@/components/header and Footer/Footer";
import FooterLand from "@/components/landing page/header footer landing/FooterLand";
import HeaderLand from "@/components/landing page/header footer landing/HeaderLand";

export default function ContactPage() {
  return (
    <>
    <HeaderLand />
    
      <ContactSidebar />
      
      {/* Old footer */}
      {/* <Footer /> */}
      
      <FooterLand />

    </>
  );
}
