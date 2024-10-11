import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

function Signup() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();  // Initialize navigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            email: email,
            name: name,
            password: password
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/api/customer/signup/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                alert(data.status);  // Display success message
                navigate('/login');  // Redirect to login page
            } else {
                alert(data.error);  // Display error message
            }

        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during signup');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

            <button type="submit">Signup</button>
        </form>
    );
}

export default Signup;
