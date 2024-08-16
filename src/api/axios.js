import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://localhost:5001/api', 
  baseURL: 'https://todo-backend-eb6f.onrender.com/api', 

  headers: {
    'Content-Type': 'application/json',
  },
});


export default instance;
