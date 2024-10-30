import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "course",
  initialState: {
    courseDetails: {},
  },
  reducers: {
    setCourseDetails: (state, action) => {
      state.courseDetails = action.payload;
    },
  },
});
export default courseSlice;
export const { setCourseDetails } = courseSlice.actions;
