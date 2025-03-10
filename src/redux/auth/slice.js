import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser, signInUser } from "./operations.js";

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => null);

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
        state.token = action.payload.data.accessToken;
        state.name = user.name?.trim() || "User";
        state.email = user.email || "";
        state.isAuthenticated = true;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.name = null;
        state.email = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export default slice.reducer;