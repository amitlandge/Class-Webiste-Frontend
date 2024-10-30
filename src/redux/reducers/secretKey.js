import { createSlice } from "@reduxjs/toolkit";

const secretSlice = createSlice({
  name: "keys",
  initialState: {
    secretKey: {},
  },
  reducers: {
    getSecretKey: (state, action) => {
      state.secretKey = action.payload;
    },
  },
});
export default secretSlice;
export const { getSecretKey } = secretSlice.actions;
