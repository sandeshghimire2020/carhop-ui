import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const { theme } = useTheme();
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userId) {
      localStorage.setItem('userId', userId); // Store the ID for later use
      navigate('/home'); // Redirect to the homepage
    } else {
      alert('Please enter a valid User ID.');
    }
  };

  return (
    <div className={`login-page ${theme}`}>
      <h2>Enter User ID</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="userId"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary">Proceed</button>
      </form>
    </div>
  );
};

export default LoginPage;
