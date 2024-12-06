import axios from 'axios';

const BASE_URL = '/api/v1/user';

// Fetch a user's profile by ID
export const getUserProfile = (id) => axios.get(`${BASE_URL}/${id}`);

// Update the user's profile
export const updateUserProfile = (id, data) => axios.put(`${BASE_URL}/${id}`, data);
