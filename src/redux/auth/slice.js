import { createSlice } from "@reduxjs/toolkit";
import { registerUser, signInUser } from "./operations.js";

const initialState = {
  name: null,
  email: null,
  gender: "",
  dailyNorm: "",
  weight: "",
  time: null,
  avatarUrl: "",
  token: null,
  error: null,
  isAuthenticated: false,
};

export const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.name = null;
      state.email = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        const user = action.payload.data.user || {}; 
        state.token = action.payload.data.accessToken;
        state.name = user.name || "User";
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        const user = action.payload.data.user || {}; 
        const userName = user.name?.trim() || "User"; 

        state.token = action.payload.data.accessToken;
        state.name = userName;
        state.email = user.email || "";
        state.isAuthenticated = true;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setUser, logout } = slice.actions;
export default slice.reducer;
