import { createSlice } from "@reduxjs/toolkit";
import { fetchLanguages, getTranslatedText } from "./actions";

const initialState = {
  languages: [],
  translations: "",
  isLoading: false,
  isError: false,
};

const translateSlice = createSlice({
  name: "translate",
  initialState,
  reducers: {
    resetTranslations: (state) => {
      state.translations = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLanguages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLanguages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.languages = action.payload;
        console.log("data has been fetched");
        console.log(action.payload[0]);
      })
      .addCase(fetchLanguages.rejected, (state) => {
        state.isError = true;
        console.log("An error has occurred when fetching data.");
      })
      .addCase(getTranslatedText.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTranslatedText.fulfilled, (state, action) => {
        state.isLoading = false;
        state.translations = action.payload;
      })
      .addCase(getTranslatedText.rejected, (state) => {
        state.isError = true;
        console.log("An error has occurred when getting translated text");
      });
  },
});

export const {resetTranslations}= translateSlice.actions

export default translateSlice.reducer;
