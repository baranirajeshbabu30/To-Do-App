import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://stellar-paprenjak-9c8f74.netlify.app/.netlify/functions/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});


export default instance;
