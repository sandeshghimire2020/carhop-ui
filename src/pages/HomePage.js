import React, { useState } from 'react';
import SearchForm from '../components/SearchForm';
import StartRideForm from '../components/StartRideForm';
import '../styles/HomePage.css';
import { useTheme } from '../context/ThemeContext'; // Import the useTheme hook

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('search');
  const [searchResults, setSearchResults] = useState([]);
  const { theme } = useTheme(); // Use the theme context

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    if (tab === 'start') {
      setSearchResults([]);
    }
  };

  return (
    <div className={`homepage ${theme}`}> {/* Apply theme class */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'search' ? 'active' : ''}`}
          onClick={() => handleTabSwitch('search')}
        >
          Search for a Ride
        </button>
        <button
          className={`tab ${activeTab === 'start' ? 'active' : ''}`}
          onClick={() => handleTabSwitch('start')}
        >
          Start a Ride
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'search' && (
          <div>
            <SearchForm onSearchResults={setSearchResults} />
            <div className="ride-results">
              {searchResults.length > 0 ? (
                searchResults.map((ride) => (
                  <div key={ride.id} className="ride-card">
                    <p><strong>Origin:</strong> {ride.originCity}</p>
                    <p><strong>Destination:</strong> {ride.destinationCity}</p>
                    <p><strong>Available Seats:</strong> {ride.availableSeats}</p>
                  </div>
                ))
              ) : (
                <p>No rides found.</p>
              )}
            </div>
          </div>
        )}
        {activeTab === 'start' && <StartRideForm />}
      </div>
    </div>
  );
};

export default HomePage;