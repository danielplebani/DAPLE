import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // cambia se il tuo backend ha un path diverso
  withCredentials: true // solo se usi cookie, altrimenti puoi omettere
});

export default api;
