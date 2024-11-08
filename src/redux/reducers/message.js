import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    messages: [],
  },
  reducers: {
    getAllMessages: (state, action) => {
      state.messages = state.messages.concat(action.payload);
    },
  },
});
export default messageSlice;
export const { getAllMessages, setAllNewMessage } = messageSlice.actions;
