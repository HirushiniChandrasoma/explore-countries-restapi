import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t text-sm text-gray-700 mt-10">
      <div className="max-w-screen-xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-5 gap-8">

        {/* Logo & Social */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-blue-700">GeoNova</h2>
          <p className="text-gray-500">For Explorers Everywhere</p>
          <div className="flex space-x-3">
            <a href="#" className="hover:text-blue-600">🌐</a>
            <a href="#" className="hover:text-pink-600">📸</a>
            <a href="#" className="hover:text-black">✖️</a>
            <a href="#" className="hover:text-red-600">📌</a>
          </div>

          <div>
            <p className="font-semibold text-gray-900">Subscribe</p>
            <p className="text-gray-500 text-xs">Get 20% off your first order.</p>
            <form className="mt-2 flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="px-3 py-2 border border-gray-300 rounded-md w-full sm:w-auto"
              />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Subscribe now
              </button>
            </form>
          </div>
        </div>

        {/* Sections */}
        <div>
          <h3 className="font-bold text-gray-900 mb-2">Top Destinations</h3>
          <ul className="space-y-1">
            {['New York', 'Paris', 'Tokyo', 'London', 'Italy'].map((place) => (
              <li key={place}><a href="#" className="hover:underline">{place}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-gray-900 mb-2">Travel Interests</h3>
          <ul className="space-y-1">
            {['Adventure', 'Culture', 'Road Trips', 'Festivals'].map((topic) => (
              <li key={topic}><a href="#" className="hover:underline">{topic}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-gray-900 mb-2">Shop</h3>
          <ul className="space-y-1">
            {['Guides', 'Kids', 'Shop', 'Non-English'].map((shop) => (
              <li key={shop}><a href="#" className="hover:underline">{shop}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-gray-900 mb-2">About Us</h3>
          <ul className="space-y-1">
            <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Terms</a></li>
            <li><a href="#" className="hover:underline">Sitemap</a></li>
          </ul>
        </div>

      </div>
      <div className="text-center text-gray-400 text-xs py-4 border-t">© 2025 GeoNova. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
