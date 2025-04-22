import { BrowserRouter, Route,Routes } from "react-router-dom";
import "./App.css";
import Home from './Home';
import Header from './Header';
import SearchCountry from './SearchCountry';
import SearchResult from './SearchResult';
import Regions from './Regions';
import Languages from './Languages';
import Continents from './Continents';


function App() {
  return (
    <BrowserRouter>
      <Header /> 
      <Routes>
      <Route path="/" element={<Home/>} /> 
      <Route path="/search-country" element={<SearchCountry/>} /> 
      <Route path="/search-result" element={<SearchResult/>} /> 
      <Route path="/search-regions" element={<Regions/>} />
      <Route path="/languages" element={<Languages/>} /> 
      <Route path="/continents" element={<Continents/>} />  
      </Routes>
    </BrowserRouter>
  );
}

export default App;