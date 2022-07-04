import { Pagination, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import PokemonCard from "../pokemon-card/pokemon-card.components";

import "./pokemon-display.styles.scss";

const PokemonDisplay = ({ pokemons, filter }) => {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    if (filter) setOffset(0);
  }, [filter]);

  const handleChange = (event, value) => {
    value -= 1;
    setOffset(value * 20);
  };

  return (
    <div className="app-contaner">
      <div className="pokemon-container">
        <div className="all-container">
          {pokemons.slice(offset, offset + 20).map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </div>
      </div>
      <Stack style={{ paddingTop: "30px" }} spacing={2}>
        <Pagination
          color="secondary"
          shape="rounded"
          count={Math.round(pokemons.length / 20)}
          onChange={handleChange}
          size="large"
        />
      </Stack>
    </div>
  );
};

export default PokemonDisplay;
