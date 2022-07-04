import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Input } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import "./pokemon-preview.styles.scss";
import { pokemonsAll } from "../../redux/pokemon/pokemons.slice";
import axios from "axios";
import FilterOptions from "../filter-options";
import PokemonDisplay from "../pokemon-display";

const PokemonPreview = () => {
  const pokemons = useSelector((state) => state.pokemons);
  const dispatch = useDispatch();
  const [searchField, setSearchField] = useState("");
  const [change, setChange] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [typeFilterPokemons, setTypeFilterPokemons] = useState([]);
  const [filterChange, setFilterChange] = useState(false);

  const handleClick = () => {
    setShowFilters(!showFilters);
  };

  const handleFilterChange = async (type, hp, atk, def) => {
    if (type !== "") {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/type/${type}`
      );
      if (response.status === 200) {
        setTypeFilterPokemons(response.data.pokemon);
        setFilterChange(true);
      }
    }
    if (hp !== 0) {
      setTypeFilterPokemons(
        typeFilterPokemons?.filter((pokemon) => pokemon.pokemon.stats[0].base_stat > 50)
      )
      setFilterChange(true);
    }
    if (atk !== 0) {
      setTypeFilterPokemons(
        typeFilterPokemons?.filter((pokemon) => pokemon.pokemon.stats[1].base_stat > 50)
      );
      setFilterChange(true);
    }
    if (def !== 0) {
      setTypeFilterPokemons(
        typeFilterPokemons?.filter((pokemon) => pokemon.pokemon.stats[2].base_stat > 50)
      );
      setFilterChange(true);
    }
  };

  const realTypeFilterPokemons = typeFilterPokemons?.map(
    (pokemon) => pokemon.pokemon
  );

  const resetFilter = () => {
    setFilterChange(false);
    setShowFilters(false);
  };

  const handleSearchChange = (event) => {
    if (event.target.value === "") setChange(false);
    if (event.target.value !== "") setChange(true);
    setSearchField(event.target.value);
  };

  useEffect(() => {
    dispatch(pokemonsAll());
  }, []);

  const filteredPokemons = pokemons?.filter((pokemon) =>
    pokemon.name.toLowerCase().startsWith(searchField.toLowerCase())
  );

  return (
    <div className="app-contaner">
      <div className="input-container">
        <Input
          className="input"
          size="normal"
          color="primary"
          placeholder="search pokemons"
          onChange={handleSearchChange}
        />
        <FilterAltIcon
          className="filter"
          sx={{ fontSize: 60 }}
          onClick={() => handleClick()}
        />
      </div>
      {showFilters ? (
        <FilterOptions
          handleChange={handleFilterChange}
          resetFilter={resetFilter}
        />
      ) : null}
      {filterChange ? (
        <PokemonDisplay pokemons={realTypeFilterPokemons} filter />
      ) : change ? (
        <PokemonDisplay pokemons={filteredPokemons} filter />
      ) : (
        <PokemonDisplay pokemons={pokemons} />
      )}
    </div>
  );
};

export default PokemonPreview;
