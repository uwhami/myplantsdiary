import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name, value, days = 1) => {
  // 날짜 없으면 1
  const expires = new Date();
  expires.setUTCDate(expires.getUTCDate() + days);

  console.log("before set cookies");

  return cookies.set(name, value, { expires: expires, path: "/" }); // path: 하위 경로.
};

export const getCookies = (name) => {
  return cookies.get(name);
};

export const removeCookies = (name, path = "/") => {
  cookies.remove(name, { path: path });
};
