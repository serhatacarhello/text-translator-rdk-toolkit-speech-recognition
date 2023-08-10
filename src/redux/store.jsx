import { configureStore } from "@reduxjs/toolkit";
import translateReducer from "./translateSlice";

const store = configureStore({
  reducer: translateReducer,
});

export default store;
