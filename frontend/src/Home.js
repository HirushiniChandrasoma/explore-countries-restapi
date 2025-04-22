import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState('Countries'); // Default selected

  const navigate = useNavigate();

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSectionSelect = (section) => {
    setSelectedSection(section);
  };

  const handleSearchClick = () => {
    navigate('/search-country');
  };

  const sections = ['Regions', 'Languages', 'Continents', 'Countries'];

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="logo">
          <span className="icon">🌍</span>
          <span className="logo-text">CountryReports</span>
        </div>

        <nav className="home-nav">
          <div className="dropdown">
            <button className="dropbtn" onClick={handleDropdownToggle}>
              Countries ▾
            </button>

            {dropdownOpen && (
              <div className="dropdown-content">
                {sections.map((section) => (
                  <div
                    key={section}
                    className={`dropdown-section-item ${
                      selectedSection === section ? 'selected' : ''
                    }`}
                    onClick={() => handleSectionSelect(section)}
                  >
                    {section}
                  </div>
                ))}
              </div>
            )}
          </div>

          <a href="#activities" className="activities-link">Activities</a>
          <button className="search-btn" onClick={handleSearchClick}>Search</button>
        </nav>
      </header>

      <section className="hero-section">
        <div className="hero-text">
          <h1>Culture</h1>
          <h1>Countries</h1>
          <h1>Travel</h1>
        </div>
        <div className="world-map">
          {/* Optional: World map image here */}
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
