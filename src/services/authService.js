import axios from 'axios';

const BASE_URL = '/api/v1/auth';

// Login user
export const loginUser = (credentials) => axios.post(`${BASE_URL}/login`, credentials);
