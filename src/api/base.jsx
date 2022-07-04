import axios from 'axios';

const baseApiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'

const api = axios.create({
  baseURL: baseApiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});


export default api;