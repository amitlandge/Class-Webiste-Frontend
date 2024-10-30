import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    isLogin: false,
  },
  reducers: {
    isAuthenticated: (state, action) => {
      state.user = action.payload;
      state.isLogin = true;
    },
    isNotAuthenticated: (state) => {
      state.user = null;
      state.isLogin = false;
    },
  },
});
export default authSlice;
export const { isAuthenticated, isNotAuthenticated } = authSlice.actions;
