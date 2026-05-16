import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/v1/auth/jwt/create/";
const ACTIVATION_URL = "http://127.0.0.1:8000/api/v1/auth/users/activation/";

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post(API_URL, { email, password });
  return res.data;
};

export const activateUser = async (uid: string, token: string) => {
  const res = await axios.post(ACTIVATION_URL, { uid, token });
  return res.data;
};