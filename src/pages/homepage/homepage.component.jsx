import React from "react";
import PokemonPreview from "../../components/pokemon-preview/pokemon-preview.component";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import "./homepage.styles.scss";
import axios from "axios";
const HomePage = () => {

  const pokemons = useSelector(state => state.pokemons)
  const [pokemonDetails, setPokemonDetails] = useState([]);


  
  useEffect(() => {
    const getPokemonDetails = async () => {
      pokemons.map(async (pokemon) => {
        const res = await axios.get(pokemon.url);
        if (res.status === 200) {
          setPokemonDetails((currentList) => [...currentList, res.data]);
        }
      });
    };
    getPokemonDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemons]);
  return (
    <div className="homepage">
      <PokemonPreview pokemonDetails={pokemonDetails}/>
    </div>
  );
};

export default HomePage;
