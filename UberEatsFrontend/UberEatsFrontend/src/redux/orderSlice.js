// src/redux/orderSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  orderStatus: 'pending', // Can be 'pending', 'completed', 'cancelled', etc.
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload.id);
    },
    updateOrderStatus: (state, action) => {
      state.orderStatus = action.payload;
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, removeFromCart, updateOrderStatus, clearCart } = orderSlice.actions;
export default orderSlice.reducer;
