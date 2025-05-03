import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Header() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedSection, setSelectedSection] = useState('Countries');
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100); // delay for animation
        return () => clearTimeout(timer);
    }, []);

    const handleDropdownToggle = () => setDropdownOpen(!dropdownOpen);

    const handleSectionSelect = (section) => {
        setSelectedSection(section);
        setDropdownOpen(false);
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
    

    const handleSearchClick = () => navigate('/search-country');

    const sections = ['Languages', 'Continents', 'Countries'];

    return (
        <header className={`bg-white shadow-md py-3 px-6 border-b border-gray-200 sticky top-0 z-50 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}>
            <div className="flex justify-between items-center max-w-screen-xl mx-auto">
                {/* Logo */}
                <Link to="/" className="text-3xl font-bold text-gray-800 tracking-wide">
                    🌍 GeoNova
                </Link>

                {/* Navigation Links */}
                <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
                    <Link to="/" className="hover:text-teal-600 transition">Home</Link>
                    <Link to="/contact" className="hover:text-teal-600 transition">Contact Us</Link>
                    <Link to="/blog" className="hover:text-teal-600 transition">Blog</Link>
                </nav>

                {/* Right Buttons */}
                <div className="flex items-center space-x-4">
                    <Link to="/register">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                            Sign Up
                        </button>
                    </Link>

                    <Link to="/login">
                        <button className="text-blue-600 font-semibold hover:text-blue-700 transition">
                            Login
                        </button>
                    </Link>

                    {/* Dropdown */}
                    <div className="relative">
                        <button
                            onClick={handleDropdownToggle}
                            className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md flex items-center gap-1 hover:bg-gray-200 transition"
                        >
                            <span>{selectedSection}</span>
                            <span>▾</span>
                        </button>
                        {dropdownOpen && (
                            <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg border border-gray-200 rounded-md z-20">
                                {sections.map((section) => (
                                    <div
                                        key={section}
                                        onClick={() => handleSectionSelect(section)}
                                        className={`cursor-pointer p-2 hover:bg-gray-100 ${selectedSection === section ? 'bg-gray-200' : ''}`}
                                    >
                                        {section}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Search Button */}
                    <button
                        onClick={handleSearchClick}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                    >
                        Search
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
