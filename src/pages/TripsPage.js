import React, { useState, useEffect } from 'react';
import { fetchUserRequests, cancelRideRequest } from '../services/rideService';
import '../styles/TripsPage.css';

const TripsPage = () => {
  const [requests, setRequests] = useState([]);
  const loggedInUserId = localStorage.getItem('userId');

  useEffect(() => {
    fetchUserRequests(loggedInUserId)
      .then((response) => setRequests(response.data))
      .catch((error) => console.error('Error fetching requests:', error));
  }, [loggedInUserId]);

  const handleCancel = (requestId) => {
    cancelRideRequest(requestId)
      .then(() => {
        setRequests((prevRequests) =>
          prevRequests.filter((request) => request.id !== requestId)
        );
        alert('Request canceled successfully!');
      })
      .catch((error) => console.error('Error canceling request:', error));
  };

  return (
    <div className="trips-page">
      <h2>My Trips</h2>
      <div>
        {requests.length > 0 ? (
          requests.map((request) => (
            <div key={request.id} className="request-card">
              <p><strong>Ride:</strong> {request.rideDetails}</p>
              <p><strong>Status:</strong> {request.status}</p>
              {request.status === 'Pending' && (
                <button
                  className="btn btn-danger"
                  onClick={() => handleCancel(request.id)}
                >
                  Cancel Request
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No requests found.</p>
        )}
      </div>
    </div>
  );
};

export default TripsPage;
