import React from "react";
import Banner from "../components/Homepage/Banner";
import TopCategories from "../components/Homepage/TopCategories";
import FeaturedProducts from "../components/Homepage/FeaturedProducts";
import Benefit from "../components/Homepage/Benefit";
import Gallery from "../components/Homepage/Gallery";

const Homepage: React.FC = () => {
  return (
    <>
      <Banner />
      <TopCategories />
      <FeaturedProducts/>
      <Benefit/>
      <Gallery/>
    </>
  );
};

export default Homepage;
