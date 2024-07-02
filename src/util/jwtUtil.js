import axios from "axios";
import { getCookies, setCookie } from "./cookieUtil";
import { API_SERVER_HOST } from "../api/todoApi";

const jwtAxios = axios.create();

const refreshJWT = async (accessToken, refreshToken) => {
  const host = API_SERVER_HOST;

  const header = { headers: { Authorization: `Bearer ${accessToken}` } };

  const res = await axios.get(
    `${host}/api/member/refresh?refreshToken=${refreshToken}`,
    header,
  );

  console.log("---------------refreshJWT----------------");
  console.log(res.data);
  return res.data;
};

const beforeRequest = (config) => {
  console.log("before request.....");

  const memberInfo = getCookies("member");

  if (!memberInfo) {
    console.log("Member NOT FOUND");
    // return Promise.reject({ response: { date: { error: "REQUEST_LOGIN" } } });
    return new Promise(function (resolve, reject) {
      reject(new Error("REQUEST_LOGIN"));
    });
  }

  const { accessToken } = memberInfo;
  console.log("--------------------------------------" + accessToken);
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
};

const requestFail = (err) => {
  console.log("request error..........");
  return Promise.reject(err);
};

const beforeResponse = async (res) => {
  console.log("before return response..........");

  const data = res.data;

  if (data && data.error === "ERROR_ACCESS_TOKEN") {
    console.log("ERROR_ACCESS_TOKEN");

    const memberCookieValue = getCookies("member");
    const result = await refreshJWT(
      memberCookieValue.accessToken,
      memberCookieValue.refreshToken,
    );

    console.log("============ memberCookieValue result=================");
    console.log(result);
    memberCookieValue.accessToken = result.accessToken;
    memberCookieValue.refreshToken = result.refreshToken;

    setCookie("member", JSON.stringify(memberCookieValue), 1);

    const originalRequest = res.config;
    originalRequest.headers.Authorization = `Bearer ${result.refreshToken}`;

    return axios(originalRequest);
  }
  return res;
};

const responseFail = (err) => {
  console.log("response error..........");
  return Promise.reject(err);
};

jwtAxios.interceptors.request.use(beforeRequest, requestFail);
jwtAxios.interceptors.response.use(beforeResponse, responseFail);

export default jwtAxios;
