import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Home from './pages/Home';
import Header from './Components/Header';
import Footer from './Components/footer'; // Ensure correct capitalization
import SearchCountry from './pages/SearchCountry';
import SearchResult from './pages/SearchResult';
import Regions from './pages/Regions';
import Languages from './pages/Languages';
import Continents from './pages/Continents';
import Login from './auth/Login';
import SignUp from './auth/Signup';
import IntroAnimation from "./Components/IntroAnimation";

function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 4000); // Match your animation duration

    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <Header />
      {showIntro ? (
        <IntroAnimation />
      ) : (
        <>
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
          <Footer />
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
