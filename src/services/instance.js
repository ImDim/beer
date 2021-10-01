import axios from 'axios';

const inststance = axios.create({
  baseURL: 'https://api.punkapi.com/v2/beers',
  headers: {
    "Content-type": "application/json"
  }
});

export default inststance;