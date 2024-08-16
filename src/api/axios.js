import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5001/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

export default instance;
