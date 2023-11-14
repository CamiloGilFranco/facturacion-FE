import { createSlice } from "@reduxjs/toolkit";

const initialState = { language: "español" };

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    modifyLanguage: (state, data) => {
      state.language = data.payload;
    },
  },
});

export const { modifyLanguage } = languageSlice.actions;

export default languageSlice.reducer;
