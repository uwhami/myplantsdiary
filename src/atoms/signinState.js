import { atom } from "recoil";

const initState = {
  email: "",
};

export const signinState = atom({
  key: "signinState",
  default: initState,
});
