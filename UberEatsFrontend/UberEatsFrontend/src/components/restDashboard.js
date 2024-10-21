// import React, { useEffect, useState } from 'react';

// const RestaurantDashboard = () => {
//   const [restaurantProfile, setRestaurantProfile] = useState(null);
//   const [dishes, setDishes] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [filteredOrders, setFilteredOrders] = useState([]);
//   const [filterStatus, setFilterStatus] = useState('All');
//   const [newDish, setNewDish] = useState({ name: '', ingredients: '', price: '', category: '', image: '' });
//   const [loading, setLoading] = useState(true);
//   const [successMessage, setSuccessMessage] = useState('');

//   const fetchRestaurantProfile = async () => {
//     // Fetch restaurant profile from API
//     const response = await fetch('/api/restaurant/profile/');
//     const data = await response.json();
//     setRestaurantProfile(data);
//   };

//   const fetchDishes = async () => {
//     // Fetch list of dishes from API
//     const response = await fetch('/api/restaurant/dishes/');
//     const data = await response.json();
//     setDishes(data);
//   };

//   const fetchOrders = async () => {
//     // Fetch list of orders from API
//     const response = await fetch('/api/restaurant/orders/');
//     const data = await response.json();
//     setOrders(data);
//     setFilteredOrders(data);
//   };

//   useEffect(() => {
//     fetchRestaurantProfile();
//     fetchDishes();
//     fetchOrders();
//     setLoading(false);
//   }, []);

//   const handleProfileUpdate = async (e) => {
//     e.preventDefault();
//     // Update restaurant profile via API
//     const response = await fetch('/api/restaurant/profile/update/', {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(restaurantProfile),
//     });
//     if (response.ok) setSuccessMessage('Profile updated successfully!');
//   };

//   const handleAddDish = async (e) => {
//     e.preventDefault();
//     // Add a new dish via API
//     const response = await fetch('/api/restaurant/dishes/add/', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(newDish),
//     });
//     if (response.ok) {
//       fetchDishes(); // Refresh dish list after adding
//       setNewDish({ name: '', ingredients: '', price: '', category: '', image: '' });
//     }
//   };

//   const handleFilterOrders = (status) => {
//     setFilterStatus(status);
//     if (status === 'All') {
//       setFilteredOrders(orders);
//     } else {
//       setFilteredOrders(orders.filter((order) => order.status === status));
//     }
//   };

//   const handleUpdateOrderStatus = async (orderId, status) => {
//     // Update order status via API
//     const response = await fetch(`/api/restaurant/orders/${orderId}/update/`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ status }),
//     });
//     if (response.ok) fetchOrders(); // Refresh order list after status update
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="restaurant-dashboard">
//       <h1>Restaurant Dashboard</h1>

//       {/* Profile Management */}
//       <section className="profile-management">
//         <h2>Profile Management</h2>
//         {restaurantProfile && (
//           <form onSubmit={handleProfileUpdate}>
//             <label>
//               Name:
//               <input
//                 type="text"
//                 value={restaurantProfile.name}
//                 onChange={(e) => setRestaurantProfile({ ...restaurantProfile, name: e.target.value })}
//               />
//             </label>
//             <label>
//               Location:
//               <input
//                 type="text"
//                 value={restaurantProfile.location}
//                 onChange={(e) => setRestaurantProfile({ ...restaurantProfile, location: e.target.value })}
//               />
//             </label>
//             <label>
//               Description:
//               <textarea
//                 value={restaurantProfile.description}
//                 onChange={(e) => setRestaurantProfile({ ...restaurantProfile, description: e.target.value })}
//               />
//             </label>
//             <label>
//               Contact Info:
//               <input
//                 type="text"
//                 value={restaurantProfile.contact_info}
//                 onChange={(e) => setRestaurantProfile({ ...restaurantProfile, contact_info: e.target.value })}
//               />
//             </label>
//             <button type="submit">Update Profile</button>
//           </form>
//         )}
//         {successMessage && <p>{successMessage}</p>}
//       </section>

//       {/* Dishes Management */}
//       <section className="dish-management">
//         <h2>Dishes Management</h2>
//         <form onSubmit={handleAddDish}>
//           <label>
//             Dish Name:
//             <input
//               type="text"
//               value={newDish.name}
//               onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
//               required
//             />
//           </label>
//           <label>
//             Ingredients:
//             <input
//               type="text"
//               value={newDish.ingredients}
//               onChange={(e) => setNewDish({ ...newDish, ingredients: e.target.value })}
//               required
//             />
//           </label>
//           <label>
//             Price:
//             <input
//               type="number"
//               value={newDish.price}
//               onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
//               required
//             />
//           </label>
//           <label>
//             Category:
//             <select
//               value={newDish.category}
//               onChange={(e) => setNewDish({ ...newDish, category: e.target.value })}
//               required
//             >
//               <option value="">Select Category</option>
//               <option value="Appetizer">Appetizer</option>
//               <option value="Salad">Salad</option>
//               <option value="Main Course">Main Course</option>
//               <option value="Dessert">Dessert</option>
//             </select>
//           </label>
//           <label>
//             Image URL:
//             <input
//               type="text"
//               value={newDish.image}
//               onChange={(e) => setNewDish({ ...newDish, image: e.target.value })}
//             />
//           </label>
//           <button type="submit">Add Dish</button>
//         </form>

//         <h3>Existing Dishes</h3>
//         <ul>
//           {dishes.map((dish) => (
//             <li key={dish.id}>{dish.name} - {dish.category} - ${dish.price}</li>
//           ))}
//         </ul>
//       </section>

//       {/* Orders Management */}
//       <section className="orders-management">
//         <h2>Orders Management</h2>
//         <label>
//           Filter Orders by Status:
//           <select value={filterStatus} onChange={(e) => handleFilterOrders(e.target.value)}>
//             <option value="All">All</option>
//             <option value="New">New</option>
//             <option value="Delivered">Delivered</option>
//             <option value="Cancelled">Cancelled</option>
//           </select>
//         </label>

//         <h3>Orders</h3>
//         <ul>
//           {filteredOrders.map((order) => (
//             <li key={order.id}>
//               {order.customer.name} - {order.status}
//               <button onClick={() => handleUpdateOrderStatus(order.id, 'Preparing')}>Preparing</button>
//               <button onClick={() => handleUpdateOrderStatus(order.id, 'On the Way')}>On the Way</button>
//               <button onClick={() => handleUpdateOrderStatus(order.id, 'Delivered')}>Delivered</button>
//               <button onClick={() => handleUpdateOrderStatus(order.id, 'Picked Up')}>Picked Up</button>
//             </li>
//           ))}
//         </ul>
//       </section>
//     </div>
//   );
// };

// export default RestaurantDashboard;

// dashboard.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [newDish, setNewDish] = useState({ name: '', description: '', price: '', category: '', image: null });
  const [editDish, setEditDish] = useState(null);
  const [editProfile, setEditProfile] = useState({});

  const restaurantId = 1; // replace with dynamic value if available
  const API_BASE_URL = "http://localhost:8000"; // replace with actual backend URL

  // 1. Fetch restaurant details
  useEffect(() => {
    axios.get(`${API_BASE_URL}/restaurant/${restaurantId}/`)
      .then((response) => setRestaurant(response.data))
      .catch((error) => console.error('Error fetching restaurant details:', error));
  }, [restaurantId]);

  // 2. Fetch all dishes in the restaurant
  useEffect(() => {
    axios.get(`${API_BASE_URL}/restaurant/${restaurantId}/dishes/`)
      .then((response) => setDishes(response.data))
      .catch((error) => console.error('Error fetching dishes:', error));
  }, [restaurantId]);

  // 3. Add new dish
  const handleAddDish = () => {
    const formData = new FormData();
    Object.keys(newDish).forEach((key) => {
      formData.append(key, newDish[key]);
    });

    axios.post(`${API_BASE_URL}/restaurant/${restaurantId}/add-dish/`, formData)
      .then(() => {
        setNewDish({ name: '', description: '', price: '', category: '', image: null });
        // Refresh dish list
        axios.get(`${API_BASE_URL}/restaurant/${restaurantId}/dishes/`).then((res) => setDishes(res.data));
      })
      .catch((error) => console.error('Error adding new dish:', error));
  };

  // 4. Edit dish details
  const handleEditDish = () => {
    axios.put(`${API_BASE_URL}/dish/${editDish.id}/edit/`, editDish)
      .then(() => {
        setEditDish(null);
        // Refresh dish list
        axios.get(`${API_BASE_URL}/restaurant/${restaurantId}/dishes/`).then((res) => setDishes(res.data));
      })
      .catch((error) => console.error('Error editing dish:', error));
  };

  // 5. Edit restaurant profile
  const handleEditProfile = () => {
    axios.put(`${API_BASE_URL}/restaurant/${restaurantId}/edit-profile/`, editProfile)
      .then((response) => {
        setRestaurant(response.data);
        setEditProfile({});
      })
      .catch((error) => console.error('Error editing profile:', error));
  };

  return (
    <div className="dashboard">
      <h1>Restaurant Dashboard</h1>

      {/* Restaurant Profile Details */}
      {restaurant && (
        <div>
          <h2>{restaurant.name}</h2>
          <p>{restaurant.description}</p>
          <button onClick={() => setEditProfile(restaurant)}>Edit Profile</button>
        </div>
      )}

      {/* Edit Profile Modal */}
      {editProfile && (
        <div className="modal">
          <h2>Edit Profile</h2>
          <input type="text" placeholder="Name" value={editProfile.name} onChange={(e) => setEditProfile({ ...editProfile, name: e.target.value })} />
          <input type="text" placeholder="Email" value={editProfile.email} onChange={(e) => setEditProfile({ ...editProfile, email: e.target.value })} />
          {/* Add other fields as needed */}
          <button onClick={handleEditProfile}>Save Changes</button>
          <button onClick={() => setEditProfile(null)}>Cancel</button>
        </div>
      )}

      {/* Dish List */}
      <h2>Dishes</h2>
      <ul>
        {dishes.map((dish) => (
          <li key={dish.id}>
            <h3>{dish.name}</h3>
            <p>{dish.description}</p>
            <p>Price: ${dish.price}</p>
            <p>Category: {dish.category}</p>
            <button onClick={() => setEditDish(dish)}>Edit Dish</button>
          </li>
        ))}
      </ul>

      {/* Add New Dish */}
      <div>
        <h2>Add New Dish</h2>
        <input type="text" placeholder="Name" value={newDish.name} onChange={(e) => setNewDish({ ...newDish, name: e.target.value })} />
        <input type="text" placeholder="Description" value={newDish.description} onChange={(e) => setNewDish({ ...newDish, description: e.target.value })} />
        <input type="number" placeholder="Price" value={newDish.price} onChange={(e) => setNewDish({ ...newDish, price: e.target.value })} />
        <input type="text" placeholder="Category" value={newDish.category} onChange={(e) => setNewDish({ ...newDish, category: e.target.value })} />
        <input type="file" onChange={(e) => setNewDish({ ...newDish, image: e.target.files[0] })} />
        <button onClick={handleAddDish}>Add Dish</button>
      </div>

      {/* Edit Dish Modal */}
      {editDish && (
        <div className="modal">
          <h2>Edit Dish</h2>
          <input type="text" placeholder="Name" value={editDish.name} onChange={(e) => setEditDish({ ...editDish, name: e.target.value })} />
          <input type="text" placeholder="Description" value={editDish.description} onChange={(e) => setEditDish({ ...editDish, description: e.target.value })} />
          <input type="number" placeholder="Price" value={editDish.price} onChange={(e) => setEditDish({ ...editDish, price: e.target.value })} />
          <input type="text" placeholder="Category" value={editDish.category} onChange={(e) => setEditDish({ ...editDish, category: e.target.value })} />
          <button onClick={handleEditDish}>Save Changes</button>
          <button onClick={() => setEditDish(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
