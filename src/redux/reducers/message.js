import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    messages: [],
    newMessages: [],
  },
  reducers: {
    getAllMessages: (state, action) => {
      state.messages = action.payload;
    },
    setAllNewMessage: (state, action) => {
      state.newMessages.concat(action.payload);
    },
  },
});
export default messageSlice;
export const { getAllMessages, setAllNewMessage } = messageSlice.actions;
