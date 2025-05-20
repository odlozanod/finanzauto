// src/api/userApi.ts
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://dummyapi.io/data/v1',
  headers: {
    'app-id': '63473330c1927d386ca6a3a5',
  },
});

export default API;
