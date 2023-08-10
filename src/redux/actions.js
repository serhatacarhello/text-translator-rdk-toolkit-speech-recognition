import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../utils/useApi";

export const fetchLanguages = createAsyncThunk(
  "translate/fetchLanguages",
  async () => {
    const response = await api.get("/getLanguages");
    // console.log(response.data.data.languages);
    const languages = response.data.data.languages;
    // to send data to store return it
    return languages;
  }
);

export const getTranslatedText = createAsyncThunk(
  "translate/getTranslateText",
  async ({ text, sourceLang, targetLang }) => {
    const encodedParams = new URLSearchParams();
    encodedParams.set("source_language", sourceLang);
    encodedParams.set("target_language", targetLang);
    encodedParams.set("text", text);
    // console.log("text", text)
    // console.log("sourceLang", sourceLang)
    // console.log("targetLang", targetLang)
    const response = await api.post("/translate", encodedParams, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    console.log(response)
    return response.data.data.translatedText;
  }
);
