import axios from 'axios';

// axios instance to be used as an access point to contact our API
// when ran in development environment (e.g. npm run dev), it will
// use the local API endpoint, when ran in the production enviroment
// (e.g. npm run build) it will use the remote API endpoint.
const eaiAPI = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ?
    'https://eai03cw.herokuapp.com/api' :
    'http://localhost:5000/api'
  }
);

export default eaiAPI;
