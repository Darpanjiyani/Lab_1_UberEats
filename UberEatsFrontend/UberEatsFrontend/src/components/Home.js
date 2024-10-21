import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Optional for styling

const Home = () => {
  const [loginType, setLoginType] = useState(''); // State to track if it's a customer or restaurant login
  const navigate = useNavigate();

  const handleLoginSelection = (type) => {
    setLoginType(type); // Update the state based on user selection
  };

  const handleLogin = () => {
    if (loginType === 'customer') {
      navigate('/customer/login'); // Redirect to customer login
    } else if (loginType === 'restaurant') {
      navigate('/restaurant/login'); // Redirect to restaurant login
    }
  };

  return (
    <div className="home-container">
      <h1>Welcome to the Portal</h1>
      <div className="login-options">
        <h2>Select Login Type:</h2>
        <button onClick={() => handleLoginSelection('customer')}>Customer Login</button>
        <button onClick={() => handleLoginSelection('restaurant')}>Restaurant Login</button>
      </div>

      {/* Display message based on selection */}
      {loginType && (
        <div className="login-confirmation">
          <p>You selected: {loginType === 'customer' ? 'Customer Login' : 'Restaurant Login'}</p>
          <button onClick={handleLogin}>Proceed to {loginType === 'customer' ? 'Customer' : 'Restaurant'} Login</button>
        </div>
      )}
    </div>
  );
};

export default Home;
