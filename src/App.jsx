import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Pokedex from "./Components/Pokedex";
import PokemonPage from "./Components/PokemonPage";
import Leaderboard from "./Components/Leaderboard";
import BattleGame from "./Components/BattleGame";
import AboutUs from "./Components/AboutUs";
import Footer from "./Components/Footer";
import Error from "./Components/Error";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path="/pokedex/:id" element={<PokemonPage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/pokefight" element={<BattleGame />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
