import {
  AuthResponse,
  EmailPassReq,
  RegisterUserReq,
  UserResponse,
  VerifyOtpReq,
  VerifyOtpResponse,
} from "@repo/shared";

import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";

import { client } from "@/lib/client/client";
import { postRequest, getRequest } from "@/lib/client/common";
const API_TOKEN_KEY = "token";

const handleAuthSuccess = async (data: AuthResponse) => {
  if (data.access.token) {
    localStorage.setItem(API_TOKEN_KEY, data.access.token);
  }
};

export const useEmailPassLogin = (
  options?: UseMutationOptions<AuthResponse, Error, EmailPassReq>
) => {
  return useMutation({
    mutationFn: (payload) => client.auth.login(payload),
    onSuccess: async (data, variables, context) => {
      await handleAuthSuccess(data);
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};

export const useRegisterUser = (
  options?: UseMutationOptions<UserResponse, Error, RegisterUserReq>
) => {
  return useMutation({
    mutationFn: (payload: RegisterUserReq) =>
      postRequest<UserResponse>("/auth/register", payload),
    onSuccess: async (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};

export const useVerifyOtp = (
  options?: UseMutationOptions<VerifyOtpResponse, Error, VerifyOtpReq>
) => {
  return useMutation({
    mutationFn: (payload: VerifyOtpReq) =>
      postRequest<VerifyOtpResponse>("/auth/verify-otp", payload),
    onSuccess: async (data, variables, context) => {
      // VerifyOtpResponse doesn't contain auth tokens, just verification status
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: () => getRequest<UserResponse>("/auth/me"),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });
};
