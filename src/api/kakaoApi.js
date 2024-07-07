/* eslint-disable camelcase */

import axios from "axios";
import { API_SERVER_HOST } from "./todoApi";

const rest_api_key = "506c7a3c16d5aed0cd72ba0f788ffed3";

const redirect_uri = "http://localhost:3000/member/kakao";

const auth_code_path = "https://kauth.kakao.com/oauth/authorize";

const access_token_uri = "https://kauth.kakao.com/oauth/token";

export const getKakaoLoginLink = () => {
  return `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
};

export const getAccessToken = async (authCode) => {
  const header = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  };

  const params = {
    grant_type: "authorization_code",
    client_id: rest_api_key,
    redirect_uri: redirect_uri,
    code: authCode,
  };

  const res = await axios.post(access_token_uri, params, header);
  return res.data.access_token;
};

export const getMemberWithAccessToken = async (accessToken) => {
  const res = await axios.get(
    `${API_SERVER_HOST}/api/member/kakao?accessToken=${accessToken}`,
  );
  return res.data;
};
