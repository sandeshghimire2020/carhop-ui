import React from 'react';
import '../styles/RideCard.css';

const RideCard = ({ ride }) => {
  return (
    <div className="ride-card">
      <p><strong>Origin:</strong> {ride.originCity}, {ride.originZip}</p>
      <p><strong>Destination:</strong> {ride.destinationCity}, {ride.destinationZip}</p>
      <p><strong>Available Seats:</strong> {ride.availableSeats}</p>
    </div>
  );
};

export default RideCard;
