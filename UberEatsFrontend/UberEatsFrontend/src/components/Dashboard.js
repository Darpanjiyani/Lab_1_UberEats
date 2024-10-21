
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Importing the CSS file

// Navbar Component
const Navbar = ({ navLinks, handleLogout }) => (
  <nav className="navbar">
    <h1 className="dashboard-title">Customer Dashboard</h1>
    <div className="nav-links">
      {navLinks.map(({ label, link, isLogout }, index) => (
        isLogout ? (
          <a key={index} href="#" onClick={handleLogout}>{label}</a> // Handle logout as navigation
        ) : (
          <a key={index} href={link}>{label}</a> // Normal navigation for other links
        )
      ))}
    </div>
  </nav>
);

// StatsCard Component
const StatsCard = ({ title, description }) => (
  <div className="card">
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

// RestaurantList Component
const RestaurantList = ({ restaurants }) => (
  <div className="available-restaurants">
    <h3>Available Restaurants</h3>
    {restaurants.length > 0 ? (
      <ul className="restaurant-list">
        {restaurants.map((restaurant, index) => (
          <li key={index}>{restaurant}</li>
        ))}
      </ul>
    ) : (
      <p>No restaurants available at the moment.</p>
    )}
  </div>
);

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();  // For redirection

  // Retrieve the username from localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = (e) => {
    e.preventDefault(); // Prevent default link behavior
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login'); // Redirect to login page
  };

  const navLinks = [
    { label: 'Profile', link: '/customer/profile' },
    { label: 'Orders', link: '/orders' },
    { label: 'Logout', link: '/logout', isLogout: true } // Specify logout link
  ];

  const stats = [
    { title: 'Recent Orders', description: 'You have 2 ongoing orders' },
    { title: 'Favorite Restaurants', description: 'You have 5 favorite restaurants' },
    { title: 'New Offers', description: 'Check out the latest deals' }
  ];

  const restaurants = ['Pizza Palace', 'Healthy Bowls', 'Burger World', 'Sushi Express', 'Taco Fiesta'];

  return (
    <div className="dashboard-container">
      <Navbar navLinks={navLinks} handleLogout={handleLogout} /> {/* Render Navbar component */}

      <div className="dashboard-content">
        <h2>Welcome Back, {username || 'Guest'}!</h2>
        <p>Here’s a quick overview of your activity.</p>

        {/* Render Stats Cards */}
        <div className="stats-cards">
          {stats.length > 0 ? (
            stats.map((stat, index) => (
              <StatsCard key={index} title={stat.title} description={stat.description} />
            ))
          ) : (
            <p>No stats available at the moment.</p>
          )}
        </div>

        {/* Render Restaurant List */}
        <RestaurantList restaurants={restaurants} />
      </div>
    </div>
  );
};

export default Dashboard;
