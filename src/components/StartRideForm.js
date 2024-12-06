import React, { useState, useEffect } from 'react';
import '../styles/StartRideForm.css';
import { startRide } from '../services/rideService';
import { getUserProfile } from '../services/userService';

const StartRideForm = () => {
  const [formData, setFormData] = useState({
    originAddress: '',
    originCity: '',
    originZip: '',
    destinationAddress: '',
    destinationCity: '',
    destinationZip: '',
    availableSeats: 0,
    returnBack: false,
    returnTime: '',
    userId: localStorage.getItem('userId'), // Get the userId from localStorage
  });
  const [vehicle, setVehicle] = useState(null); // Store vehicle details

  useEffect(() => {
    // Fetch user profile and extract vehicle details
    const userId = localStorage.getItem('userId');
    if (userId) {
      getUserProfile(userId)
        .then((response) => {
          const userVehicle = response.data.vehicle;
          if (userVehicle) {
            setVehicle(userVehicle);
            setFormData((prevFormData) => ({
              ...prevFormData,
              vehicleId: userVehicle.id, // Include vehicleId for submission
            }));
          }
        })
        .catch((error) => console.error('Error fetching user profile:', error));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      vehicleId: vehicle?.id, // Only send vehicleId to the backend
    };
    startRide(submissionData)
      .then(() => {
        alert('Ride started successfully!');
        setFormData({
          originAddress: '',
          originCity: '',
          originZip: '',
          destinationAddress: '',
          destinationCity: '',
          destinationZip: '',
          availableSeats: 0,
          returnBack: false,
          returnTime: '',
          userId: localStorage.getItem('userId'), // Reset userId
        });
      })
      .catch((error) => {
        console.error('Error starting ride:', error);
        alert('Failed to start the ride.');
      });
  };

  return (
    <form className="start-ride-form" onSubmit={handleSubmit}>
      <h2>Start a Ride</h2>
      {vehicle ? (
        <div className="vehicle-details">
          <p><strong>Plate Number:</strong> {vehicle.plateNumber || 'N/A'}</p>
          <p><strong>Type:</strong> {vehicle.type || 'N/A'}</p>
          <p><strong>Make:</strong> {vehicle.make || 'N/A'}</p>
          <p><strong>Model:</strong> {vehicle.model || 'N/A'}</p>
          <p><strong>Year:</strong> {vehicle.year || 'N/A'}</p>
        </div>
      ) : (
        <p>Loading vehicle details...</p>
      )}
      <label>
        Origin Address:
        <input
          type="text"
          name="originAddress"
          value={formData.originAddress}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Origin City:
        <input
          type="text"
          name="originCity"
          value={formData.originCity}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Origin Zip:
        <input
          type="text"
          name="originZip"
          value={formData.originZip}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Destination Address:
        <input
          type="text"
          name="destinationAddress"
          value={formData.destinationAddress}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Destination City:
        <input
          type="text"
          name="destinationCity"
          value={formData.destinationCity}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Destination Zip:
        <input
          type="text"
          name="destinationZip"
          value={formData.destinationZip}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Available Seats:
        <input
          type="number"
          name="availableSeats"
          value={formData.availableSeats}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Return Back?
        <input
          type="checkbox"
          name="returnBack"
          checked={formData.returnBack}
          onChange={handleChange}
        />
      </label>
      {formData.returnBack && (
        <label>
          Return Time:
          <input
            type="datetime-local"
            name="returnTime"
            value={formData.returnTime}
            onChange={handleChange}
          />
        </label>
      )}
      <button type="submit" className="btn btn-success">Start Ride</button>
    </form>
  );
};

export default StartRideForm;
