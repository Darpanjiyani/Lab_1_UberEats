// Profile.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    username: '', email: '', date_of_birth: '', city: '', state: '', country: '', phone_number: '', nickname: ''
  });
  const [countries, setCountries] = useState([]); // For the country dropdown
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Fetch the profile data when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/customer/profile/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const data = await response.json();
        setProfileData(data.data);  // Set profile data
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    // Fetch country list (either from external API or static data)
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all'); // Example API for countries
        const data = await response.json();
        const countryList = data.map(country => country.name.common);  // Get country names
        setCountries(countryList);
      } catch (error) {
        setCountries(['United States', 'Canada', 'India']); // Fallback static list
      }
    };

    fetchProfile();
    fetchCountries();
  }, [navigate]);

  // Log the user out
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Handle profile update
  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/customer/profile/update/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const data = await response.json();
      setSuccessMessage('Profile updated successfully');
    } catch (error) {
      setError('Error updating profile');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      {profileData ? (
        <div className="profile-details">
          <form onSubmit={handleUpdate}>
            <label>
              <strong>Username:</strong>
              <input
                type="text"
                value={profileData.username}
                onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                required
              />
            </label>
            <br />
            <label>
              <strong>Email:</strong>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                required
              />
            </label>
            <br />
            <label>
              <strong>Date of Birth:</strong>
              <input
                type="date"
                value={profileData.date_of_birth}
                onChange={(e) => setProfileData({ ...profileData, date_of_birth: e.target.value })}
              />
            </label>
            <br />
            <label>
              <strong>City:</strong>
              <input
                type="text"
                value={profileData.city}
                onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
              />
            </label>
            <br />
            <label>
              <strong>State:</strong>
              <input
                type="text"
                value={profileData.state}
                onChange={(e) => setProfileData({ ...profileData, state: e.target.value })}
              />
            </label>
            <br />
            <label>
              <strong>Country:</strong>
              <select
                value={profileData.country}
                onChange={(e) => setProfileData({ ...profileData, country: e.target.value })}
              >
                <option value="">Select Country</option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </label>
            <br />
            <label>
              <strong>Phone Number:</strong>
              <input
                type="tel"
                value={profileData.phone_number}
                onChange={(e) => setProfileData({ ...profileData, phone_number: e.target.value })}
              />
            </label>
            <br />
            <label>
              <strong>Nickname:</strong>
              <input
                type="text"
                value={profileData.nickname}
                onChange={(e) => setProfileData({ ...profileData, nickname: e.target.value })}
              />
            </label>
            <br />
            <button type="submit">Update Profile</button>
          </form>
          {successMessage && <p>{successMessage}</p>}
        </div>
      ) : (
        <p>No profile data available.</p>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
