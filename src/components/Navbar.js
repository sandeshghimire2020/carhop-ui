import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // Clear user data from localStorage
    navigate('/'); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">RideShare</div>
      <ul className="navbar-links">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/my-trips">My Trips</Link></li>
        <li className="profile-dropdown">
          Profile
          <ul className="dropdown-menu">
            <li><Link to="/profile">View Profile</Link></li>
            <li>
              <button className="dropdown-logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
