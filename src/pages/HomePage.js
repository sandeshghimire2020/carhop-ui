import React, { useState } from 'react';
import SearchForm from '../components/SearchForm';
import StartRideForm from '../components/StartRideForm';
import '../styles/HomePage.css';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('search'); // Manage active tab
  const [searchResults, setSearchResults] = useState([]); // Store search results

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    if (tab === 'start') {
      setSearchResults([]); // Clear search results when switching to Start a Ride
    }
  };

  return (
    <div className="homepage">
      {/* Tabs */}
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

      {/* Tab Content */}
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
