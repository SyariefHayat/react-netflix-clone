import Jumbotron from "@modules/LandingPage/Jumbotron";
import SectionEnjoy from "@modules/LandingPage/SectionContents/SectionEnjoy";
import SectionDownload from "@modules/LandingPage/SectionContents/SectionDownload";
import SectionWatch from "@modules/LandingPage/SectionContents/SectionWatch";
import SectionProfile from "@modules/LandingPage/SectionContents/SectionProfile";
import SectionFAQ from "@modules/LandingPage/SectionContents/SectionFAQ";
import Footer from "@modules/LandingPage/Footer";
import Navbar from "@/pages/Landing/Navbar";

function Landing() {
  return (
    <>
      <Navbar />
      <Jumbotron />
      <SectionEnjoy />
      <SectionDownload />
      <SectionWatch />
      <SectionProfile />
      <SectionFAQ />
      <Footer />
    </>
  );
}

export default Landing;
