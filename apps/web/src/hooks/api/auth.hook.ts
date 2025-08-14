import {
  AuthResponse,
  EmailPassReq,
  UserResponse,
} from "@repo/shared";

import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";

import { client } from "@/lib/client/client";
import { getRequest } from "@/lib/client/common";
import { setAuthToken } from "@/utils/auth.utils";

const handleAuthSuccess = async (data: AuthResponse) => {
  if (data.access.token) {
    setAuthToken(data.access.token);
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

// Registration and OTP verification hooks removed - admin-only user creation now
// export const useRegisterUser = ...
// export const useVerifyOtp = ...

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: () => getRequest<UserResponse>("/auth/me"),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });
};
