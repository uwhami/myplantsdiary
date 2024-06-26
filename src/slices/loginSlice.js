import { createSlice } from "@reduxjs/toolkit";

const initState = {
  email: "",
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: initState,
  reducers: {
    login: (state, action) => {
      console.log(state);
      console.log(action);
      console.log(action.payload);
      return { email: action.payload.email, password: action.payload.password };
    },
    logout: (state, action) => {
      console.log(action.payload);
      return { ...initState };
    },
  },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
