import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector} from 'react-redux'
import { useDispatch } from "react-redux";
import {Pagination, Stack} from '@mui/material'


import PokemonCard from "../pokemon-card/pokemon-card.components";

import './pokemon-preview.styles.scss';
import { pokemonsAll } from "../../redux/pokemon/pokemons.slice";



const PokemonPreview = () =>{
  const [offset, setOffset] = useState(0)
  const pokemons = useSelector(state => state.pokemons)
  const dispatch = useDispatch()

  const handleChange = (event, value) => {
    value -= 1
    setOffset(value * 20)
  }

  useEffect(() => {
    if(offset > 0)
      dispatch(pokemonsAll(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`))
    if(offset === 0 || offset < 0)
      dispatch(pokemonsAll())
  }, [offset])


  return(
    <div className="app-contaner">
      <div className="pokemon-container">
        <div className="all-container">
          {
            pokemons.map(pokemon => 
              <PokemonCard key={pokemon.name} pokemon={pokemon} />
            )
          }
        </div>
      </div>

      <Stack style={{ paddingTop: '30px' }} spacing={2}>
        <Pagination color="secondary" shape="rounded" count={10} onChange={handleChange} size="large" />
      </Stack>
    </div>
  )
}



export default PokemonPreview ;