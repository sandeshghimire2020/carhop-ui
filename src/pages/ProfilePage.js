import React, { useEffect, useState } from 'react';
import { getUserProfile, updateUserProfile } from '../services/userService';
import '../styles/ProfilePage.css';

const ProfilePage = () => {
  const userId = localStorage.getItem('userId'); // Retrieve user ID from localStorage
  const [profile, setProfile] = useState(null); // Store profile data
  const [isEditing, setIsEditing] = useState(false); // Toggle between view and edit modes

  useEffect(() => {
    if (userId) {
      getUserProfile(userId)
        .then((response) => setProfile(response.data))
        .catch((error) => console.error('Error fetching profile:', error));
    }
  }, [userId]);

  const handleSave = () => {
    updateUserProfile(userId, profile)
      .then((response) => {
        setProfile(response.data); // Update profile with the latest data from backend
        setIsEditing(false); // Switch back to view mode
        alert('Profile updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
        alert('Failed to update profile.');
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [parent, child] = name.split('.');

    if (child) {
      // Handle nested fields (e.g., identification, vehicle)
      setProfile((prevProfile) => ({
        ...prevProfile,
        [parent]: {
          ...prevProfile[parent],
          [child]: value,
        },
      }));
    } else {
      // Handle top-level fields
      setProfile((prevProfile) => ({
        ...prevProfile,
        [name]: value,
      }));
    }
  };

  if (!profile) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="profile-page">
      <h2>{isEditing ? 'Edit Profile' : 'View Profile'}</h2>
      {!isEditing ? (
        <div>
          <p><strong>First Name:</strong> {profile.firstName}</p>
          <p><strong>Middle Name:</strong> {profile.middleName || 'N/A'}</p>
          <p><strong>Last Name:</strong> {profile.lastName}</p>
          <p><strong>Date of Birth:</strong> {profile.dateOfBirth}</p>
          <p><strong>Gender:</strong> {profile.gender}</p>
          <h3>Identification</h3>
          <p><strong>Number:</strong> {profile.identification?.number || 'N/A'}</p>
          <p><strong>Type:</strong> {profile.identification?.type || 'N/A'}</p>
          <p><strong>Expiration:</strong> {profile.identification?.expiration || 'N/A'}</p>
          <p><strong>Country:</strong> {profile.identification?.country || 'N/A'}</p>
          <h3>Vehicle</h3>
          <p><strong>Plate Number:</strong> {profile.vehicle?.plateNumber || 'N/A'}</p>
          <p><strong>Type:</strong> {profile.vehicle?.type || 'N/A'}</p>
          <p><strong>Make:</strong> {profile.vehicle?.make || 'N/A'}</p>
          <p><strong>Model:</strong> {profile.vehicle?.model || 'N/A'}</p>
          <p><strong>Year:</strong> {profile.vehicle?.year || 'N/A'}</p>
          <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      ) : (
        <div>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={profile.firstName}
              onChange={handleChange}
            />
          </label>
          <label>
            Middle Name:
            <input
              type="text"
              name="middleName"
              value={profile.middleName || ''}
              onChange={handleChange}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={profile.lastName}
              onChange={handleChange}
            />
          </label>
          <label>
            Date of Birth:
            <input
              type="date"
              name="dateOfBirth"
              value={profile.dateOfBirth}
              onChange={handleChange}
            />
          </label>
          <label>
            Gender:
            <select
              name="gender"
              value={profile.gender}
              onChange={handleChange}
            >
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select>
          </label>
          <h3>Identification</h3>
          <label>
            Number:
            <input
              type="text"
              name="identification.number"
              value={profile.identification?.number || ''}
              onChange={handleChange}
            />
          </label>
          <label>
            Type:
            <input
              type="text"
              name="identification.type"
              value={profile.identification?.type || ''}
              onChange={handleChange}
            />
          </label>
          <label>
            Expiration:
            <input
              type="date"
              name="identification.expiration"
              value={profile.identification?.expiration || ''}
              onChange={handleChange}
            />
          </label>
          <label>
            Country:
            <input
              type="text"
              name="identification.country"
              value={profile.identification?.country || ''}
              onChange={handleChange}
            />
          </label>
          <h3>Vehicle</h3>
          <label>
            Plate Number:
            <input
              type="text"
              name="vehicle.plateNumber"
              value={profile.vehicle?.plateNumber || ''}
              onChange={handleChange}
            />
          </label>
          <label>
            Type:
            <input
              type="text"
              name="vehicle.type"
              value={profile.vehicle?.type || ''}
              onChange={handleChange}
            />
          </label>
          <label>
            Make:
            <input
              type="text"
              name="vehicle.make"
              value={profile.vehicle?.make || ''}
              onChange={handleChange}
            />
          </label>
          <label>
            Model:
            <input
              type="text"
              name="vehicle.model"
              value={profile.vehicle?.model || ''}
              onChange={handleChange}
            />
          </label>
          <label>
            Year:
            <input
              type="text"
              name="vehicle.year"
              value={profile.vehicle?.year || ''}
              onChange={handleChange}
            />
          </label>
          <button className="btn btn-success" onClick={handleSave}>Save</button>
          <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
