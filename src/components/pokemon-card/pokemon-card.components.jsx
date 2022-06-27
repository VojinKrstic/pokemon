import React from "react";
import PokemonDetails from "../PokemonDetails";
import './pokemon-card.styles.scss'

const PokemonCard = ({pokemon}) => {
  return (
    <PokemonDetails key={pokemon.name} url={pokemon.url} />
  );
}
export default PokemonCard