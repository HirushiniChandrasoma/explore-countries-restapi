import React from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";

import login from "../images/login.jpg";
import img1 from "../images/login.jpg";
import img2 from "../images/login.jpg";
import img3 from "../images/login.jpg";

const imageData = [
  {
    img: img1,
    title: "Mountain Majesty",
    description: "Discover the beauty of the misty peaks and tranquil valleys."
  },
  {
    img: img2,
    title: "Ocean Bliss",
    description: "Feel the serenity of endless waves and golden horizons."
  },
  {
    img: img3,
    title: "Urban Vibes",
    description: "Explore the heartbeat of the city through its lights and life."
  }
];

const Home = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section className="bg-gradient-to-b from-teal-900 to-cyan-800 text-white font-sans py-6 px-4 md:px-8">
      <div className="p-6 flex justify-between items-center">
        <div className="text-xl font-bold"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center px-12 py-8">
        {/* Left Side Text */}
        <motion.div
          className="space-y-6"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            EXPLORE <br /> THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
              WORLD
            </span>
          </h1>
          <p className="text-gray-200 max-w-md">
            It encourages exploration of unfamiliar territories, embracing diverse cultures and landscapes,
            while pursuing the desired destination that captivates the heart and ignites a sense of wonder.
          </p>
          <div className="flex gap-4">
            <div className="flex space-x-4 text-2xl">
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
        </motion.div>

        {/* Right Side Carousel */}
        <motion.div
          className="w-full"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Slider {...sliderSettings}>
            {imageData.map((item, idx) => (
              <div key={idx} className="pr-4">
                <div className="rounded overflow-hidden shadow-lg bg-white text-black">
                  <img src={item.img} alt={`destination-${idx}`} className="w-full h-50 object-cover" />
                  <div className="p-4">
                    <h2 className="font-bold text-lg">{item.title}</h2>
                    <p className="text-sm text-gray-700 mt-2">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;
