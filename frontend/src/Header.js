import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

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
        <header className="bg-white shadow-md py-2 px-6 border-b border-gray-300">
            <div className="flex justify-between items-center max-w-screen-xl mx-auto">
                {/* Left side - menu + logo */}
                <div className="flex items-center">
                    <Link to="/" className="text-2xl font-bold text-gray-800 ml-2">
                        🌍Geonova
                    </Link>
                </div>

                {/* Right side - always show login/signup */}
                <div className="flex items-center space-x-4">
                    <Link to="/register">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                            Sign Up
                        </button>
                    </Link>
                    <Link to="/login">
                        <button className="text-blue-500 font-semibold hover:text-blue-600 transition">
                            Login
                        </button>
                    </Link>
                    
                    {/* Dropdown */}
                    <div className="relative">
                        <button
                            className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md flex items-center space-x-1"
                            onClick={handleDropdownToggle}
                        >
                            <span>{selectedSection}</span>
                            <span>▾</span>
                        </button>
                        {dropdownOpen && (
                            <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg border border-gray-200 rounded-md z-20">
                                {sections.map((section) => (
                                    <div
                                        key={section}
                                        className={`cursor-pointer hover:bg-gray-100 p-2 ${selectedSection === section ? 'bg-gray-200' : ''}`}
                                        onClick={() => handleSectionSelect(section)}
                                    >
                                        {section}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                        onClick={handleSearchClick}
                    >
                        Search
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
