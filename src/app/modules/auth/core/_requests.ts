import axios from "axios";
import api from "../../../services/api"
import { AuthModel, AuthModelUser } from "./_models";

const API_URL = import.meta.env.VITE_APP_API_URL;
// const BASE_URL = import.meta.env.VITE_ETMS_API_URL;

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`;
export const LOGIN_URL = `${API_URL}/login`;
export const REGISTER_URL = `${API_URL}/register`;
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot-password`;

// Server should return AuthModel
export function login(username: string, password: string) {
  return api.post<AuthModel>("/auth/signin",{
    username,
    password
  })
  // return axios.post<AuthModel>(BASE_URL+"/auth/signin", {
  //   username,
  //   password,
  // });
}

// Server should return AuthModel
export function register(
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  password_confirmation: string
) {
  return axios.post(REGISTER_URL, {
    email,
    first_name: firstname,
    last_name: lastname,
    password,
    password_confirmation,
  });
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return api.post<{ result: boolean }>("/auth/forgot-password", {
    email,
  });
}

export function getUserByToken(token: string) {
  return api.post<AuthModelUser>("/auth/verify-token", {
    token: token,
  });
}

export function checkToken(token: string) {
  return api.get<{is_ok: boolean, message: string}>("/auth/check-token",{
      headers: {
        Authorization: `Bearer ${token}` // or wherever you store your token
      }
  });
}

export function changePassword(token: string, password: string){
  return api.post<{is_ok:boolean, message: string}>(
    "/auth/reset-password",
    { password:password },
    {
      headers: {
        Authorization: `Bearer ${token}` // or wherever you store your token
      }
    });
}