import axios from 'axios';

const BASE_URL = '/api/v1';

// Search for rides
export const searchRides = (params = {}) => {
  const query = new URLSearchParams(params).toString(); // Build query string if params exist
  return axios.get(`${BASE_URL}/session${query ? `?${query}` : ''}`);
};

// Start a ride
export const startRide = (data) => axios.post(`${BASE_URL}/session?expireAt=ONE_HOUR`, data);

// Approve a ride request
export const approveRequest = (requestId) =>
  axios.put(`${BASE_URL}/request/${requestId}?requestStatus=APPROVED`);

// Reject a ride request
export const rejectRequest = (requestId) =>
  axios.put(`${BASE_URL}/request/${requestId}?requestStatus=REJECTED`);

// Fetch ride requests
export const getRideRequests = (sessionId) =>
  axios.get(`${BASE_URL}/session/${sessionId}/requests`);

export const requestToJoinRide = (hopUserId, hopSessionId) => {
  const requestTime = new Date().toISOString();
  return axios.post(`${BASE_URL}/request`, { hopUserId, hopSessionId, requestTime });
};

// Cancel a ride request
export const cancelRideRequest = (requestId) => axios.delete(`${BASE_URL}/request/${requestId}`);

// Fetch user requests
export const fetchUserRequests = (userId) =>
  axios.get(`${BASE_URL}/request/user/${userId}`);


