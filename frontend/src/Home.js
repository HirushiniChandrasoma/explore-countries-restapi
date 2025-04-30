import React from 'react';
import WorldVideo from "../src/images/worldMap.mp4";

export default function Home() {
  return (
    <div className="font-sans">
      <section className="flex h-[85vh] bg-gradient-to-r from-[#001f3f] to-[#004466] text-white">
        {/* Left Section */}
        <div className="flex-1 flex items-center justify-center pl-[60px] opacity-0 animate-fadeIn delay-200">
          <div className="max-w-[500px] opacity-0 animate-fadeIn delay-400">
            <h1 className="text-5xl mb-5 transform -translate-x-12 opacity-0 animate-slideIn delay-200">
              <span className="text-white">Explore the </span>
              <span className="text-teal-400">World</span>
            </h1>
            <p className="text-lg leading-relaxed text-gray-300 delay-400">Discover countries, cultures, languages, and continents in one place.</p>
            <p className="text-lg leading-relaxed text-gray-300 delay-500">Navigate through regions and learn what makes each nation unique.</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex items-center justify-center pr-[60px]">
          <video className="w-full object-cover max-h-[95%] rounded-xl shadow-lg" autoPlay loop muted playsInline>
            <source src={WorldVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-5 text-white">
        <div className="footer-links mb-2">
          <a href="#africa" className="text-gray-200 hover:text-teal-400">Africa</a> |
          <a href="#asia" className="text-gray-200 hover:text-teal-400">Asia</a> |
          <a href="#oceania" className="text-gray-200 hover:text-teal-400">Australia-Oceania</a> |
          <a href="#americas" className="text-gray-200 hover:text-teal-400">The Americas</a> |
          <a href="#europe" className="text-gray-200 hover:text-teal-400">Europe</a>
        </div>
        <div className="text-gray-200 text-sm">One World - Nations Online</div>
      </footer>
    </div>
  );
}
