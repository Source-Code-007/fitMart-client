import React from "react";
import Banner from "../components/Homepage/Banner";
import TopCategories from "../components/Homepage/TopCategories";
import FeaturedProducts from "../components/Homepage/FeaturedProducts";
import Benefit from "../components/Homepage/Benefit";

const Homepage: React.FC = () => {
  return (
    <>
      <Banner />
      <TopCategories />
      <FeaturedProducts/>
      <Benefit/>
    </>
  );
};

export default Homepage;
