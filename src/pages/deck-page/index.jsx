import { Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PokemonDetails from "../../components/PokemonDetails";
import { removeCardFromDeck } from "../../redux/pokemon/pokemons.slice";

import "./deck-page.styles.scss";

const DeckPage = () => {
  const deck = useSelector((state) => state.deckList);
  const dispatch = useDispatch();
  console.log(deck)
  return (
    <div className="deck">
      {deck.map((pokemon, index) => (
        <div>
          <PokemonDetails
            key={index}
            name={pokemon.name}
          />
          <Button
            variant="contained"
            onClick={() => dispatch(removeCardFromDeck(pokemon))}
          >
            Remove card from deck
          </Button>
        </div>
      ))}
    </div>
  );
};

export default DeckPage;
