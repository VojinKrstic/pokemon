import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/base';

export const pokemonsAll = createAsyncThunk(
  'pokemons/all',
  async (props, { rejectWithValue } ) => {
    try {
      const response = await api.get(props);
      const data = await response.data;
      return data;
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  },
);

const initialState = {
  pokemons: [],
  deckList: [],
  nextPage: null,
  prevPage: null,
  count: 0,
  error: null
};

export const pokemonSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    addCardToDeck: (state, action) => {
      const existingPokemon = state.deckList.find(deckItem => deckItem.id === action.payload.id)
      existingPokemon ? state.deckList = [...state.deckList]
      : state.deckList = [...state.deckList, action.payload]
      console.log(action.payload)
    },
    removeCardFromDeck: (state, action) => {
      state.deckList = state.deckList.filter(
        deckItem => deckItem.id !== action.payload.id
      )
    }
  },
  extraReducers: (builder) => {
    builder.addCase(pokemonsAll.fulfilled, (state, action) => {
      state.pokemons = action.payload.results;
      state.count = action.payload.count;
      state.nextPage = action.payload.next;
      state.prevPage = action.payload.prev;
    });
    builder.addCase(pokemonsAll.rejected, (state, action) => {
      state.pokemons = [];
      state.error = action.payload;
    });

  },
});

export const pokemonReducer = pokemonSlice.reducer;

export const {addCardToDeck} = pokemonSlice.actions;

export const {removeCardFromDeck} = pokemonSlice.actions;
