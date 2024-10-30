import { createSlice } from "@reduxjs/toolkit";

const miscSlice = createSlice({
  name: "misc",
  initialState: {
    emojiPopUp: false,
    openAttachments: false,
    deleteMessage: false,
    sideMenu: false,
    moreToggle: false,
  },
  reducers: {
    setEmojiPopUp: (state, action) => {
      state.emojiPopUp = action.payload;
    },
    setOpenAttachments: (state, action) => {
      state.openAttachments = action.payload;
    },
    setDeleteMessage: (state, action) => {
      state.deleteMessage = action.payload;
    },
    setSideMenu: (state, action) => {
      state.sideMenu = action.payload;
    },
    setMoreToggle: (state, action) => {
      state.moreToggle = action.payload;
    },
  },
});
export default miscSlice;
export const {
  setEmojiPopUp,
  setOpenAttachments,
  setDeleteMessage,
  setSideMenu,
  setMoreToggle,
} = miscSlice.actions;
