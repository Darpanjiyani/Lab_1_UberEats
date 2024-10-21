

// export default Login;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for redirection

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();  // Initialize navigate for redirection

    // Check if token exists on component mount, redirect to profile if token is found
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/customer/dashboard');  // Redirect to profile if the token exists
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginData = {
            email: email,
            password: password,
        };

        try {
            // Send POST request to Django API for login
            const response = await fetch('http://127.0.0.1:8000/api/customer/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            const data = await response.json();  // Parse the response data

            if (response.ok) {
                // If login is successful
                alert('Login successful');
                localStorage.setItem('token', data.token);  // Save token to local storage
                localStorage.setItem('username', data.username);  // Optionally store username
                navigate('/customer/dashboard');  // Redirect to profile page
            } else {
                // Handle login failure (e.g., invalid credentials)
                alert(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during login');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Email:</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <label>Password:</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <button type="submit">Login</button>
        </form>
    );
}

export default Login;
