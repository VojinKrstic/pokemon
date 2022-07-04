import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Button, Grow } from "@mui/material";
import { addCardToDeck } from "../../redux/pokemon/pokemons.slice";
import { useDispatch, useSelector } from "react-redux";

import "./singlePokemon.styles.scss";
import { Link } from "react-router-dom";

const PokemonAllDetails = () => {
  const { pokemonName } = useParams();
  const [details, setDetails] = useState(null);
  const dispatch = useDispatch();
  const [id, setId] = useState();
  const deck = useSelector(state => state.deckList)

  const fetchDetails = async () => {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    if (response.status === 200) {
      setDetails(await response.data);
      setId((await response?.data?.id) + 1);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [pokemonName]);

  useEffect(() => {
    fetchDetails();
  }, [id]);

  return (
    <div>
      <Grow in={true}>
        <div className={`${details?.types[0].type.name} thumb-container2`}>
          <div className="detail-wrapper2">
            <img
              alt="pokemon"
              src={details?.sprites.other.dream_world.front_default}
            />
            <h2>{details?.name}</h2>
            <div className="abilities">
              <h3>Abilities: </h3>
              {details?.abilities.map((ability) => (
                <div key={ability.ability.name}>{ability.ability.name}</div>
              ))}
            </div>
            <div className="type">
              <h3>Type: </h3>
              {details?.types.map((type) => (
                <div key={type.type.name}>{type.type.name}</div>
              ))}
            </div>
            <h3>Stats: </h3>
            <div className="stats">
              {details?.stats.map((stat) => (
                <div key={stat.stat.name}>
                  {stat.stat.name}: {stat.base_stat}
                  <br />
                </div>
              ))}
            </div>
          </div>
          <br />
          <Button
            variant="outlined"
            onClick={() => {dispatch(addCardToDeck(details)); console.log(deck)}}
          >
            Add to deck
          </Button>
        </div>
      </Grow>
      <div className="buttons">
        <Link onClick={() => setId(id + 1)} to={`/${id}`}>
          <Button variant="contained">Next pokemon</Button>
        </Link>
        <Link to={`/deck`}>
          <Button variant="contained">Deck</Button>
        </Link>
      </div>
    </div>
  );
};

export default PokemonAllDetails;
