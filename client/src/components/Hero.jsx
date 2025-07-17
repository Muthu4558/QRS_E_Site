import React from "react";
import { motion } from "framer-motion";
import heroImg from "../assets/hero.svg";
import bgImg from "../assets/herobg.jpg"; // Replace with your own image path if different

const Hero = () => {
  return (
    <section
      id="home"
      className="relative pt-32 pb-20 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${bgImg})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-opacity-60 z-0"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col-reverse lg:flex-row items-center justify-between text-white">
        {/* Text Content */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 text-center lg:text-left"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Redefine Your Style <br />
            with <span className="text-violet-600">Elegant Choices</span>
          </h1>
          <p className="text-lg mb-8 text-gray-200">
            Elevate your fashion game with exclusive collections, trendsetting designs, and guaranteed comfort.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href="#products"
              className="bg-violet-600 hover:bg-violet-700 text-white text-lg px-6 py-3 rounded-xl shadow-md transition duration-300"
            >
              Shop Now  →
            </a>
            {/* <a
              href="#explore"
              className="text-indigo-300 hover:text-indigo-100 text-lg font-medium underline underline-offset-4"
            >
              Browse Collections
            </a> */}
          </div>
        </motion.div>

        {/* Image Content */}
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:w-1/2 relative"
        >
          <div className="relative z-10">
            <img
              src={heroImg}
              alt="Fashion"
              className="w-full max-w-lg mx-aut0"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
