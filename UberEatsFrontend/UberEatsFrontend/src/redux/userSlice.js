// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    // If you want to set user specifically, you can add the following action:
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { login, logout, setUser } = userSlice.actions;
export default userSlice.reducer;
