import { createSlice } from "@reduxjs/toolkit";

const initState = {
  email: "",
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: initState,
  reducers: {
    login: (state, action) => {
      console.log(action.payload);
    },
    logout: (state, action) => {
      console.log(action.payload);
    },
  },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
