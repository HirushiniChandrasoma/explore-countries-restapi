import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Home from './Home';
import Header from './Header';
import SearchCountry from './SearchCountry';
import SearchResult from './SearchResult';
import Regions from './Regions';
import Languages from './Languages';
import Continents from './Continents';
import Login from './Login';
import SignUp from './Signup';
import IntroAnimation from "./IntroAnimation";

function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Set a timer to hide intro after animation
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 4000); // matches IntroAnimation timing

    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      {/* Header always visible */}
      <Header />
      
      {/* Conditionally render intro animation */}
      {showIntro ? (
        <IntroAnimation />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/search-country" element={<SearchCountry />} />
          <Route path="/search-result" element={<SearchResult />} />
          <Route path="/search-regions" element={<Regions />} />
          <Route path="/languages" element={<Languages />} />
          <Route path="/continents" element={<Continents />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
