import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './PokemonDetails.styles.scss'

const PokemonDetails = ({ name }) => {
  const [details, setDetails] = useState(null);

  const fetchDetails = async () => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (response.status === 200) {
      setDetails(await response.data);
    }
  };

  useEffect(() => {
    fetchDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (  
    <div className={`${details?.types[0].type.name} thumb-container`}>
      <div className="detail-wrapper">
        <Link className="link" to={`/${details?.name}`}>
          <img
            alt="pokemon"
            src={details?.sprites.other.dream_world.front_default}
          />
          <h2 className='pokemon-name'>{details?.name}</h2>
        </Link>
      </div>
    </div>
  );
};

export default PokemonDetails;
