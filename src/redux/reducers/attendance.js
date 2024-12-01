import { createSlice } from "@reduxjs/toolkit";

const attendaceSlice = createSlice({
  name: "attendance",
  initialState: {
    attendance: [],
  },
  reducers: {
    setAttendace: (state, action) => {
      state.attendance = action.payload;
    },
  },
});
export default attendaceSlice;
export const { setAttendace } = attendaceSlice.actions;