import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth";
import enrollSlice from "./reducers/enroll";
import secretSlice from "./reducers/secretKey";
import messageSlice from "./reducers/message";
import miscSlice from "./reducers/misc";

import assignmentSlice from "./reducers/assignment";
import coursesSlice from "./reducers/courses";
import adminSlice from "./reducers/admin";
import attendaceSlice from "./reducers/attendance";

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [enrollSlice.name]: enrollSlice.reducer,
    [secretSlice.name]: secretSlice.reducer,
    [messageSlice.name]: messageSlice.reducer,
    [miscSlice.name]: miscSlice.reducer,
    [assignmentSlice.name]: assignmentSlice.reducer,
    [coursesSlice.name]: coursesSlice.reducer,
    [adminSlice.name]: adminSlice.reducer,
    [attendaceSlice.name]: attendaceSlice.reducer,
  },
});

export default store;
