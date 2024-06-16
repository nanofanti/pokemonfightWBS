import { createContext, useState, useEffect } from "react";

export const PokemonAPIContext = createContext();

export default function PokemonAPIContextProvider(props) {
  const [allPokemons, setAllPokemons] = useState([
    { id: "", name: { english: "" }, type: [], url: "" },
  ]);
  const [loading, setLoading] = useState(true); // Initialize loading state as true
  const [userChosenPokemon, setUserChosenPokemon] = useState(null); // New state for storing the chosen pokemon for battle

  // Function to choose a pokemon for battle
  const choosePokemonForBattle = (pokemon) => {
    setUserChosenPokemon(pokemon);
  };

  const fetchAPI = () => {
    try {
      fetch("https://pokenode-56qg.onrender.com/pokemon")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setAllPokemons(data.data);
          setLoading(false); // Set loading to false when data fetching is complete
        });
    } catch (error) {
      console.error("Error fetching pokemons:", error);
      setLoading(false); // In case of error, set loading to false
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <PokemonAPIContext.Provider
      value={{
        allPokemons,
        loading,
        userChosenPokemon,
        choosePokemonForBattle,
      }}
    >
      {props.children}
    </PokemonAPIContext.Provider>
  );
}
