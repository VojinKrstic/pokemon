import React, { useEffect, useState } from "react";

import { Radio, FormControlLabel, RadioGroup, Button } from "@mui/material";

import "./filter-options.styles.scss";
import axios from "axios";

const FilterOptions = ({ handleChange, resetFilter }) => {
  const [types, setTypes] = useState([]);
  const [typeFilter, setTypeFilter] = useState('')
  const [hpFilter, setHpFilter] = useState(0)
  const [atkFilter, setAtkFilter] = useState(0)
  const [defFilter, setDefFilter] = useState(0)

  const getAllTypes = async () => {
    const response = await axios.get(`https://pokeapi.co/api/v2/type`);
    if (response.status === 200) {
      setTypes(await response?.data.results);
    }
  };

  console.log(typeFilter, hpFilter, atkFilter, defFilter)

  useEffect(() => {
    getAllTypes();
  }, []);

  return (
    <div className="filter-container">
      <div className="type-container">
        <p>Pokemon type</p>
        <RadioGroup name="radio-buttons-group" className="types">
          {types.map((type) => (
            <FormControlLabel
              key={type.name}
              control={
                <Radio
                  value={type.name}
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                  onChange={(event) => setTypeFilter(event.target.value)}
                />
              }
              label={type.name}
            />
          ))}
        </RadioGroup>
      </div>
      <div className="hp-container">
        <p>Health points</p>
        <RadioGroup name="radio-buttons-group" className="types" onChange={(event) => setHpFilter(event.target.value)}>
          <FormControlLabel
            value={0}
            control={<Radio sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }} />}
            label="asc"
          />
          <FormControlLabel
            value={1}
            control={<Radio sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }} />}
            label="desc"
          />
         
        </RadioGroup>
      </div>
      <div className="attack-container">
        <p>Attack</p>
        <RadioGroup name="radio-buttons-group" className="types" onChange={(event) => setAtkFilter(event.target.value)}>
          <FormControlLabel
            value={0}
            control={<Radio sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }} />}
            label="asc"
          />
          <FormControlLabel
            value={1}
            control={<Radio sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }} />}
            label="desc"
          />
         
        </RadioGroup>
      </div>
      <div className="defense-container">
        <p>Defense</p>
        <RadioGroup name="radio-buttons-group" className="defense-container" onChange={(event) => setDefFilter(event.target.value)}>
          <FormControlLabel
            value={0}
            control={<Radio sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }} />}
            label="asc"
          />
          <FormControlLabel
            value={1}
            control={<Radio sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }} />}
            label="desc"
          />
         
        </RadioGroup>
        <div className="reset-button">
          <Button onClick={resetFilter} variant="contained">
            Reset filters
          </Button>
          <Button onClick={() => handleChange(typeFilter, hpFilter, atkFilter, defFilter)} variant="contained">
            Apply filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterOptions;
