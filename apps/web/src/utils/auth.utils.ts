import { API_TOKEN_KEY } from "./common.utils";

export const getAuthToken = (): string | null => {
  return localStorage.getItem(API_TOKEN_KEY);
};

export const setAuthToken = (token: string): void => {
  localStorage.setItem(API_TOKEN_KEY, token);
};

export const removeAuthToken = (): void => {
  localStorage.removeItem(API_TOKEN_KEY);
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};
