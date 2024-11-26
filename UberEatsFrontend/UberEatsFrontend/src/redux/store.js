// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';  // Ensure this path is correct

const store = configureStore({
  reducer: {
    user: userReducer,  // Add other reducers here if necessary
  },
});

export default store;  // Default export
