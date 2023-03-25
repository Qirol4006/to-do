import axios from "axios";

// axios.defaults.baseURL = 'https://v-back.herokuapp.com'
// axios.defaults.baseURL = 'http://localhost:1102'
axios.defaults.baseURL = 'http://videokurs.uz:1102'

axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
