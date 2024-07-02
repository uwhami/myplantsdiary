import axios from "axios";
import { getCookies } from "./cookieUtil";

const jwtAxios = axios.create();

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
  return res;
};

const responseFail = (err) => {
  console.log("response error..........");
  return Promise.reject(err);
};

jwtAxios.interceptors.request.use(beforeRequest, requestFail);
jwtAxios.interceptors.response.use(beforeResponse, responseFail);

export default jwtAxios;
