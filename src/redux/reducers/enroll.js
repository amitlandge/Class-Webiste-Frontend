import { createSlice } from "@reduxjs/toolkit";

const enrollSlice = createSlice({
  name: "enroll",
  initialState: {
    enrollDetails: {},
  },
  reducers: {
    getEnrollDetails: (state, action) => {
      state.enrollDetails = action.payload;
    },
  },
});
export default enrollSlice;
export const { getEnrollDetails } = enrollSlice.actions;
