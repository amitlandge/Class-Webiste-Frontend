import { createSlice } from "@reduxjs/toolkit";

const assignmentSlice = createSlice({
  name: "assignment",
  initialState: {
    assignment: [],
  },
  reducers: {
    setAssignment: (state, action) => {
      state.assignment = action.payload;
    },
  },
});
export default assignmentSlice;
export const { setAssignment } = assignmentSlice.actions;
