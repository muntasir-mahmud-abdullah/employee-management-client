import React from "react";
import Banner from "../components/Banner";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import AboutUs from "../components/AboutUs";
import Achievements from "../components/Achivements";

const Home = () => {
  return (
    
    <div>
      <Banner></Banner>
      <Services></Services>
      <Testimonials></Testimonials>
      <AboutUs></AboutUs>
      <Achievements></Achievements>
    </div>
  );
};

export default Home;
