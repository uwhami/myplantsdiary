import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../api/memberApi";
import { getCookies, removeCookies, setCookie } from "../util/cookieUtil";

const initState = {
  email: "",
};

const loadMemberCookie = () => {
  return getCookies("member");
};

export const loginPostAsync = createAsyncThunk("loginPostAsync", (param) =>
  loginPost(param),
);

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: loadMemberCookie() || initState,
  reducers: {
    login: (state, action) => {
      console.log(state);
      console.log(action);
      console.log(action.payload);

      setCookie("member", JSON.stringify(action.payload));
      return action.payload;
    },
    logout: (state, action) => {
      console.log(action.payload);
      removeCookies("member");
      return { ...initState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginPostAsync.fulfilled, (state, action) => {
        console.log("fulfilled");
        const payload = action.payload;
        console.log(!payload.error);
        if (!payload.error) {
          console.log("cookie");
          setCookie("member", JSON.stringify(payload));
        }

        return action.payload;
      })
      .addCase(loginPostAsync.pending, (state, action) => {
        console.log("pending");
      })
      .addCase(loginPostAsync.rejected, (state, action) => {
        console.log("rejected");
      });
  },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
