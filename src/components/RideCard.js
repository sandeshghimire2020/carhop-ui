import React from 'react';
import '../styles/RideCard.css';
import { useTheme } from '../context/ThemeContext';

const RideCard = ({ ride }) => {
  const { theme } = useTheme();
  return (
    <div className={`ride-card ${theme}`}>
      <p><strong>Origin:</strong> {ride.originCity}, {ride.originZip}</p>
      <p><strong>Destination:</strong> {ride.destinationCity}, {ride.destinationZip}</p>
      <p><strong>Available Seats:</strong> {ride.availableSeats}</p>
    </div>
  );
};

export default RideCard;
