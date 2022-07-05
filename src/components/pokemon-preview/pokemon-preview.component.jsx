import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Input } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import axios from "axios";

import "./pokemon-preview.styles.scss";
import { pokemonsAll } from "../../redux/pokemon/pokemons.slice";
import FilterOptions from "../filter-options";
import PokemonDisplay from "../pokemon-display";

const PokemonPreview = ({ pokemonDetails }) => {
  console.log(pokemonDetails);
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

  const handleFilterChange = (type, hp, atk, def) => {
    if (type !== "") {
      setTypeFilterPokemons(
        pokemonDetails?.filter(
          (pokemon) => pokemon?.types[0].type.name === type
        )
      );
      setFilterChange(true);
    }
    if (hp !== 0) {
      if(hp===0){
        
      }
      if(hp===1){

      }
    }
    if (atk !== 0) {
      
    }
    if (def !== 0) {
      
    }
  };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <PokemonDisplay pokemons={typeFilterPokemons} filter />
      ) : change ? (
        <PokemonDisplay pokemons={filteredPokemons} filter />
      ) : (
        <PokemonDisplay pokemons={pokemons} />
      )}
    </div>
  );
};

export default PokemonPreview;
