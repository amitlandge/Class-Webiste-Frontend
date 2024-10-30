import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth";
import enrollSlice from "./reducers/enroll";
import secretSlice from "./reducers/secretKey";
import messageSlice from "./reducers/message";
import miscSlice from "./reducers/misc";
import courseSlice from "./reducers/course";

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [enrollSlice.name]: enrollSlice.reducer,
    [secretSlice.name]: secretSlice.reducer,
    [messageSlice.name]: messageSlice.reducer,
    [miscSlice.name]: miscSlice.reducer,
    [courseSlice.name]: courseSlice.reducer,
  },
});

export default store;
