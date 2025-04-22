import { BrowserRouter, Route,Routes } from "react-router-dom";
import "./App.css";
import Home from './Home';
import SearchCountry from './SearchCountry';
import SearchResult from './SearchResult';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home/>} /> 
      <Route path="/search-country" element={<SearchCountry/>} /> 
      <Route path="/search-result" element={<SearchResult/>} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;