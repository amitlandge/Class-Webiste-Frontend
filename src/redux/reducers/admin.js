import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    dataCount: {},
    countGirlsBoys: {},
    users: [],
    enrolls: [],
    assignments: [],
    courses: [],
    courseDetails: {},
    teachers: [],
  },
  reducers: {
    setAdminDataCount: (state, action) => {
      state.dataCount = action.payload;
    },
    setCountGirlsBoys: (state, action) => {
      state.countGirlsBoys = action.payload;
    },
    setAdminUsers: (state, action) => {
      state.users = action.payload;
    },
    setEnrolls: (state, action) => {
      state.enrolls = action.payload;
    },
    setAdminAssignment: (state, action) => {
      state.assignments = action.payload;
    },
    setAdminCourses: (state, action) => {
      state.courses = action.payload;
    },
    setCourseDetails: (state, action) => {
      state.courseDetails = action.payload;
    },
    setAdminTeachers: (state, action) => {
      state.teachers = action.payload;
    },
  },
});
export default adminSlice;
export const {
  setAdminDataCount,
  setCountGirlsBoys,
  setAdminUsers,
  setEnrolls,
  setAdminAssignment,
  setAdminCourses,
  setCourseDetails,
  setAdminTeachers,
} = adminSlice.actions;
