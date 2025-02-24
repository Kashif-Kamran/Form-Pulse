// import { AuthResponse, EmailPassReq } from "@repo/shared";
import { AuthResponse, EmailPassReq } from "@repo/shared";
import { postRequest } from "./common";

async function register(payload: EmailPassReq) {
  return postRequest<AuthResponse>("/auth/register", payload);
}

async function login(payload: EmailPassReq) {
  return postRequest<AuthResponse>("/auth/login", payload);
}

async function logout(payload: { token: string }) {
  return postRequest<void>("/auth/logout", payload);
}

async function refreshToken(payload: { token: string }) {
  return postRequest<AuthResponse>("/auth/refresh-token", payload);
}

export const auth = {
  register,
  login,
  logout,
  refreshToken,
};
