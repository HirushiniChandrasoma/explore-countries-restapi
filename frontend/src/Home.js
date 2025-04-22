import React, { useState } from 'react';
import './Home.css';
import WorldVideo from "../src/images/worldMap.mp4";

export default function Home() {

  return (
    <div className="home-container">
       <section className="hero-section">
        <div className="hero-left">
          <div className="hero-text">
            <h1>
              <span className="white-text">Explore the </span>
              <span className="highlight-text">World</span>
            </h1>
            <p>Discover countries, cultures, languages, and continents in one place.</p>
            <p>Navigate through regions and learn what makes each nation unique.</p>
          </div>
        </div>
        <div className="hero-right">
          
        <video className="hero-video" autoPlay loop muted playsInline>
            <source src={WorldVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      <footer className="home-footer">
        <div className="footer-links">
          <a href="#africa">Africa</a> | 
          <a href="#asia">Asia</a> | 
          <a href="#oceania">Australia-Oceania</a> | 
          <a href="#americas">The Americas</a> | 
          <a href="#europe">Europe</a>
        </div>
        <div className="footer-note">One World - Nations Online</div>
      </footer>
    </div>
  );
}
