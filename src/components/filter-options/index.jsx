import React, { useEffect, useState } from "react";

import { Radio, FormControlLabel, RadioGroup, Button } from "@mui/material";

import "./filter-options.styles.scss";
import axios from "axios";

const FilterOptions = ({ handleChange, resetFilter }) => {
  const [types, setTypes] = useState([]);
  const [typeFilter, setTypeFilter] = useState("");
  const [hpFilter, setHpFilter] = useState(-1);
  const [atkFilter, setAtkFilter] = useState(-1);
  const [defFilter, setDefFilter] = useState(-1);
  const [disabledP, setDisabledP] = useState(false);
  const [disabledH, setDisabledH] = useState(false);
  const [disabledA, setDisabledA] = useState(false);
  const [disabledD, setDisabledD] = useState(false);

  const getAllTypes = async () => {
    const response = await axios.get(`https://pokeapi.co/api/v2/type`);
    if (response.status === 200) {
      setTypes(await response?.data.results);
    }
  };

  

  useEffect(() => {
    getAllTypes();
  }, [types]);

  return (
    <div className="filter-container">
      <div className="type-container">
        <p>Pokemon type</p>
        <RadioGroup name="radio-buttons-group" className="types">
          {types.map((type) => (
            <FormControlLabel
              key={type.name}
              control={
                (disabledH || disabledA || disabledD) ? (
                  <Radio
                  disabled
                  value={type.name}
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                  onChange={(event) => {
                    setTypeFilter(event.target.value);
                    setDisabledP(true);
                  }}
                />
                ) : (
                  <Radio
                  value={type.name}
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                  onChange={(event) => {
                    setTypeFilter(event.target.value);
                    setDisabledP(true);
                  }}
                />
                )
              }
              label={type.name}
            />
          ))}
        </RadioGroup>
      </div>
      <div className="hp-container">
        <p>Health points</p>
        {(disabledP || disabledA || disabledD) ? (
          <RadioGroup
            name="radio-buttons-group"
            className="types"
            onChange={(event) => {setHpFilter(event.target.value); setDisabledH(true)}}
          >
            <FormControlLabel
              value={0}
              control={
                <Radio
                  disabled
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                />
              }
              label="asc"
            />
            <FormControlLabel
              value={1}
              control={
                <Radio
                  disabled
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                />
              }
              label="desc"
            />
          </RadioGroup>
        ) : (
          <RadioGroup
            name="radio-buttons-group"
            className="types"
            onChange={(event) => {setHpFilter(event.target.value); setDisabledH(true)}}
          >
            <FormControlLabel
              value={0}
              control={
                <Radio sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }} />
              }
              label="asc"
            />
            <FormControlLabel
              value={1}
              control={
                <Radio sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }} />
              }
              label="desc"
            />
          </RadioGroup>
        )}
      </div>

      <div className="attack-container">
        <p>Attack</p>
        {(disabledH || disabledP || disabledD) ? (
          <RadioGroup
          name="radio-buttons-group"
          className="types"
          onChange={(event) => {setAtkFilter(event.target.value); setDisabledA(true)}}
        >
          <FormControlLabel
            value={0}
            control={<Radio disabled sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }} />}
            label="asc"
          />
          <FormControlLabel
            value={1}
            control={<Radio disabled sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }} />}
            label="desc"
          />
        </RadioGroup>
        ) : (
          <RadioGroup
          name="radio-buttons-group"
          className="types"
          onChange={(event) => {setAtkFilter(event.target.value); setDisabledA(true)}}
        >
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
        )}
        
      </div>
      <div className="defense-container">
        <p>Defense</p>
        {(disabledH || disabledA || disabledP) ? (
          <RadioGroup
          name="radio-buttons-group"
          className="defense-values"
          onChange={(event) => {setDefFilter(event.target.value); setDisabledD(true)}}
        >
          <FormControlLabel
            value={0}
            control={<Radio disabled sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }} />}
            label="asc"
          />
          <FormControlLabel
            value={1}
            control={<Radio disabled sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }} />}
            label="desc"
          />
        </RadioGroup>
        ) : (
          <RadioGroup
          name="radio-buttons-group"
          className="defense-values"
          onChange={(event) => {setDefFilter(event.target.value); setDisabledD(true)}}
        >
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
        )}
        
        <div className="reset-button">
          <Button size="small" onClick={resetFilter} variant="contained">
            Reset filters
          </Button>
          <Button
            size="small"
            onClick={() =>
              handleChange(typeFilter, hpFilter, atkFilter, defFilter)
            }
            variant="contained"
          >
            Apply filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterOptions;
