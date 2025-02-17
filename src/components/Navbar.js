import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../assets/ridesharelogo.png';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav className={`navbar ${theme}`}>
      <div className="navbar-logo">
        RideShare
        <img src={logo} alt="RideShare Logo" className="logo-image" />
      </div>
      <ul className="navbar-links">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/trips">My Trips</Link></li>
        <li className="profile-dropdown">
          Profile
          <ul className={`dropdown-menu ${theme}`}>
            <li><Link to="/profile">View Profile</Link></li>
            <li>
              <button className="dropdown-logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </li>
        <li>
          <button onClick={toggleTheme}>
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;