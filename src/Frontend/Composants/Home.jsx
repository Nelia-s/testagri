import React from "react";
import Header from "../Composants/Header";
import Main from "../Composants/Main";
import FoodCategories from "../Composants/Categories";
import AboutUs from "../Composants/About";
import Contact from "../Composants/Contact";
import Footer from "../Composants/Footer";

const Home = () => {
  return (
    <div className="home-page">
      <Header />
      <Main />
      <FoodCategories />
      <AboutUs />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
