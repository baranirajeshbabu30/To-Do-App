import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://todo-backend-eb6f.onrender.com/api', 

  headers: {
    'Content-Type': 'application/json',
  },
});


export default instance;
