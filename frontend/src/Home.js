import React from 'react';
import WorldVideo from "../src/images/worldMap.mp4";

export default function Home() {
  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="flex h-[85vh] bg-gradient-to-r from-[#001f3f] to-[#004466] text-white">
        {/* Left Section: Text Content */}
        <div className="flex-1 flex items-center justify-center pl-12 opacity-0 animate-fadeIn delay-200">
          <div className="max-w-[500px] opacity-0 animate-fadeIn delay-400">
            <h1 className="text-5xl mb-5 transform -translate-x-12 opacity-0 animate-slideIn delay-200 font-bold">
              <span className="text-teal-400">Explore the World</span>
            </h1>
            <p className="text-lg leading-relaxed text-gray-300 mb-2 delay-400">
              Discover countries, cultures, languages, and continents in one place.
            </p>
            <p className="text-lg leading-relaxed text-gray-300 mb-2 delay-500">
              Navigate through regions and learn what makes each nation unique.
            </p>
          </div>
        </div>

        {/* Right Section: Video */}
        <div className="flex-1 flex items-center justify-center pr-12 relative">
          {/* Video Background with Overlay */}
          <div className="absolute inset-0 bg-black opacity-40 rounded-xl"></div>
          <video
            className="w-full object-cover max-h-[95%] rounded-xl shadow-lg z-10"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={WorldVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-[#001f3f] py-6 text-white">
        <div className="footer-links text-center mb-4">
          <a href="#africa" className="text-gray-200 hover:text-teal-400 mx-2 transition duration-300">Africa</a> |
          <a href="#asia" className="text-gray-200 hover:text-teal-400 mx-2 transition duration-300">Asia</a> |
          <a href="#oceania" className="text-gray-200 hover:text-teal-400 mx-2 transition duration-300">Australia-Oceania</a> |
          <a href="#americas" className="text-gray-200 hover:text-teal-400 mx-2 transition duration-300">The Americas</a> |
          <a href="#europe" className="text-gray-200 hover:text-teal-400 mx-2 transition duration-300">Europe</a>
        </div>
        <div className="text-center text-gray-200 text-sm">
          One World - Nations Online
        </div>
      </footer>
    </div>
  );
}
