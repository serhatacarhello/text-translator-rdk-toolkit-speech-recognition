import axios from "axios";
const baseURL = "https://text-translator2.p.rapidapi.com";

export const api = axios.create({
  baseURL,
  headers: {
    "X-RapidAPI-Key": `${import.meta.env.VITE_API_KEY}`,
    "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
  },
});


