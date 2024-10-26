// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';  // Import useNavigate

// function Signup() {
//     const [email, setEmail] = useState('');
//     const [name, setName] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();  // Initialize navigate

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const formData = {
//             email: email,
//             name: name,
//             password: password
//         };

//         try {
//             const response = await fetch('http://127.0.0.1:8000/api/customer/signup/', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(formData),
//             });

//             const data = await response.json();
//             console.log(data);

//             if (response.ok) {
//                 alert(data.status);  // Display success message
//                 navigate('/login');  // Redirect to login page
//             } else {
//                 alert(data.error);  // Display error message
//             }

//         } catch (error) {
//             console.error('Error:', error);
//             alert('An error occurred during signup');
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <label>Name:</label>
//             <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

//             <label>Email:</label>
//             <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

//             <label>Password:</label>
//             <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

//             <button type="submit">Signup</button>
//         </form>
//     );
// }

// export default Signup;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

function Signup() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState(''); // Restaurant Address
    const [city, setCity] = useState(''); // Restaurant City
    const [state, setState] = useState(''); // Restaurant State
    const [country, setCountry] = useState(''); // Restaurant Country
    const [isCustomerSignup, setIsCustomerSignup] = useState(true); // Toggle between customer and restaurant
    const navigate = useNavigate();  // Initialize navigate

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const formData = {
          email: email,
          name: name,
          password: password,
          ...(isCustomerSignup ? {} : {
            address: address,
            city: city,
            state: state,
            country: country,
          }),
        };
      
        const signupUrl = isCustomerSignup 
          ? 'http://127.0.0.1:8000/api/customer/signup/' 
          : 'http://127.0.0.1:8000/api/restaurant/signup/';
      
        try {
          const response = await fetch(signupUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
      
          const data = await response.json();
          console.log(data); // Log the response data for debugging
      
          if (response.ok) {
            alert(data.message || 'Signup successful'); // Use a fallback message
            navigate('/login'); // Redirect to login page
          } else {
            alert(data.message || 'Signup failed'); // Use a fallback message
          }
        } catch (error) {
          console.error('Error:', error);
          alert('An error occurred during signup');
        }
      };
      

    return (
        <div className="signup-container">
            <h1>{isCustomerSignup ? 'Customer Signup' : 'Restaurant Signup'}</h1>
            
            {/* Toggle buttons for selecting between Customer and Restaurant Signup */}
            <div className="toggle-signup">
                <button 
                    onClick={() => setIsCustomerSignup(true)} 
                    className={isCustomerSignup ? 'active' : ''}
                >
                    Customer Signup
                </button>
                <button 
                    onClick={() => setIsCustomerSignup(false)} 
                    className={!isCustomerSignup ? 'active' : ''}
                >
                    Restaurant Signup
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />

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

                {/* Conditionally render fields if restaurant signup */}
                {!isCustomerSignup && (
                    <>

                        <label>Address:</label>
                        <input 
                            type="text" 
                            value={address} 
                            onChange={(e) => setAddress(e.target.value)} 
                            required 
                        />

                        <label>City:</label>
                        <input 
                            type="text" 
                            value={city} 
                            onChange={(e) => setCity(e.target.value)} 
                            required 
                        />

                        <label>State:</label>
                        <input 
                            type="text" 
                            value={state} 
                            onChange={(e) => setState(e.target.value)} 
                            required 
                        />

                        <label>Country:</label>
                        <input 
                            type="text" 
                            value={country} 
                            onChange={(e) => setCountry(e.target.value)} 
                            required 
                        />
                    </>
                )}

                <button type="submit">Signup</button>
            </form>
        </div>
    );
}

export default Signup;
