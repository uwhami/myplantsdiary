import axios from "axios";
import { API_SERVER_HOST } from "./todoApi";

/* eslint-disable camelcase */

const host = `${API_SERVER_HOST}/api/auth/google`;

export const getMemberWithAccessToken = async (credentialResponse) => {
  const header = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const params = {
    credential: credentialResponse,
  };

  const res = await axios.post(`${host}`, params, header);
  return res.data.access_token;
};
