import React, { useState } from 'react';
import '../styles/SearchForm.css';
import { searchRides } from '../services/rideService';

const SearchForm = ({ onSearchResults }) => {
  const [formData, setFormData] = useState({
    originCity: '',
    originState: '',
    originZip: '',
    destinationCity: '',
    destinationState: '',
    destinationZip: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredParams = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value.trim() !== '')
    ); // Remove empty fields
    searchRides(filteredParams)
      .then((response) => onSearchResults(response.data))
      .catch((error) => console.error('Error searching rides:', error));
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="originCity"
        placeholder="Origin City"
        value={formData.originCity}
        onChange={handleChange}
      />
      <input
        type="text"
        name="originState"
        placeholder="Origin State"
        value={formData.originState}
        onChange={handleChange}
      />
      <input
        type="text"
        name="originZip"
        placeholder="Origin Zip"
        value={formData.originZip}
        onChange={handleChange}
      />
      <input
        type="text"
        name="destinationCity"
        placeholder="Destination City"
        value={formData.destinationCity}
        onChange={handleChange}
      />
      <input
        type="text"
        name="destinationState"
        placeholder="Destination State"
        value={formData.destinationState}
        onChange={handleChange}
      />
      <input
        type="text"
        name="destinationZip"
        placeholder="Destination Zip"
        value={formData.destinationZip}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn-primary">Search</button>
    </form>
  );
};

export default SearchForm;
