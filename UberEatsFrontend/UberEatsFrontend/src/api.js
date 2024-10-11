import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api'; // Backend API URL with /api prefix

// Fetch customer profile
export const getCustomerProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/customer/profile/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching customer profile:', error);
    throw error;
  }
};

// Customer signup
export const customerSignup = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/customer/signup/`, {
      name, email, password
    });
    return response.data;
  } catch (error) {
    console.error('Error during signup:', error);
    throw error;
  }
};

// Customer login
export const customerLogin = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/customer/login/`, {
      email, password
    });
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

// Add favorite restaurant
export const addFavoriteRestaurant = async (restaurant_id) => {
  try {
    const response = await axios.post(`${API_URL}/customer/favorites/add/${restaurant_id}/`);
    return response.data;
  } catch (error) {
    console.error('Error adding favorite restaurant:', error);
    throw error;
  }
};

// Remove favorite restaurant
export const removeFavoriteRestaurant = async (restaurant_id) => {
  try {
    const response = await axios.delete(`${API_URL}/customer/favorites/remove/${restaurant_id}/`);
    return response.data;
  } catch (error) {
    console.error('Error removing favorite restaurant:', error);
    throw error;
  }
};
