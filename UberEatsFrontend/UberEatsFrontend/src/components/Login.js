

// // export default Login;
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';  // Import useNavigate for redirection

// function Login() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();  // Initialize navigate for redirection

//     // Check if token exists on component mount, redirect to profile if token is found
//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             navigate('/customer/dashboard');  // Redirect to profile if the token exists
//         }
//     }, [navigate]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const loginData = {
//             email: email,
//             password: password,
//         };

//         try {
//             // Send POST request to Django API for login
//             const response = await fetch('http://127.0.0.1:8000/api/customer/login/', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(loginData),
//             });

//             const data = await response.json();  // Parse the response data

//             if (response.ok) {
//                 // If login is successful
//                 alert('Login successful');
//                 localStorage.setItem('token', data.token);  // Save token to local storage
//                 localStorage.setItem('username', data.username);  // Optionally store username
//                 navigate('/customer/dashboard');  // Redirect to profile page
//             } else {
//                 // Handle login failure (e.g., invalid credentials)
//                 alert(data.message || 'Login failed');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             alert('An error occurred during login');
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <label>Email:</label>
//             <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//             />

//             <label>Password:</label>
//             <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//             />

//             <button type="submit">Login</button>
//         </form>
//     );
// }

// export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [isCustomerLogin, setIsCustomerLogin] = useState(true); // Toggle between customer and restaurant login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginUrl = isCustomerLogin 
      ? 'http://127.0.0.1:8000/api/customer/login/' 
      : 'http://127.0.0.1:8000/api/restaurant/login/';

    try {
      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token); // Store token in localStorage
      if (isCustomerLogin) {
        navigate('/customer/dashboard'); // Redirect to customer dashboard
      } else {
        navigate('/restaurant/dashboard'); // Redirect to restaurant dashboard
      }
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <h1>{isCustomerLogin ? 'Customer Login' : 'Restaurant Login'}</h1>
      <div className="toggle-login">
        {/* Toggle between customer and restaurant login */}
        <button onClick={() => setIsCustomerLogin(true)} className={isCustomerLogin ? 'active' : ''}>
          Customer Login
        </button>
        <button onClick={() => setIsCustomerLogin(false)} className={!isCustomerLogin ? 'active' : ''}>
          Restaurant Login
        </button>
      </div>

      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <br />
        <label>Password:</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <br />
        <button type="submit">Login</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Login;