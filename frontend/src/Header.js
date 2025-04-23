import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import "./Header.css";
import "./Home.css";


function Header() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedSection, setSelectedSection] = useState('Countries'); // Default selected
  
    const navigate = useNavigate();
  
    const handleDropdownToggle = () => {
      setDropdownOpen(!dropdownOpen);
    };
  
    const handleSectionSelect = (section) => {
      setSelectedSection(section);
      setDropdownOpen(false);
    
      // Navigate based on section
      switch (section) {
        case 'Countries':
          navigate('/search-country');
          break;
        case 'Languages':
          navigate('/languages');
          break;
        case 'Continents':
          navigate('/continents');
          break;
        default:
          break;
      }
    };
  
    const handleSearchClick = () => {
      navigate('/search-country');
    };
  
    const sections = ['Languages', 'Continents', 'Countries'];
  return (
    <>
      <header className="header">
        <div className="header-container">
          {/* Left side - menu + logo */}
          <div className="header-left">
            <Link to="/" className="logo-container">
              <div className="logo">🌍Geonova</div>
            </Link>
          </div>

          {/* Right side - always show login/signup */}
          <div className="header-right">
            <Link to="/register">
              <button className="primary-button">Sign Up</button>
            </Link>
            <Link to="/login">
              <button className="text-button-login">Login</button>
            </Link>
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

          <button className="search-btn" onClick={handleSearchClick}>Search</button>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
