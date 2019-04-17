import axios from 'axios';

const eaiAPI = axios.create({ baseURL: process.env.NODE_ENV === 'production' ? 'https://eai03cw.herokuapp.com/api' : 'http://localhost:5000/api' });

export default eaiAPI;
