import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("fetchUsers", async () => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/users");
  console.log(res.data);
});

const initialState = {
  users: [],
  isError: false,
  isLoading: true,
};

export const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.users = action.payload;
    },
    [fetchUsers.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export default testSlice.reducer;
