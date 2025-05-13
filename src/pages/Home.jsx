import React from "react";
import Banner from "../components/Banner";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import AboutUs from "../components/AboutUs";
import Achievements from "../components/Achivements";
import HowItWorks from "./HowItWorks";
import CaseStudies from "./CaseStudies";
import FAQ from "./FAQ";
import Careers from "./Careers";
import HeroCarousel from "../components/HeroCarousel";

const Home = () => {
  return (
    
    <div>
      {/* <Banner></Banner> */}
      <HeroCarousel />
      <Services></Services>
      <HowItWorks></HowItWorks>
      <Testimonials></Testimonials>
      <AboutUs></AboutUs>
      <CaseStudies></CaseStudies>
      <Achievements></Achievements>
      <Careers></Careers>
      <FAQ></FAQ>
    </div>
  );
};

export default Home;
