import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from "@/lib/client/common";
import {
  RoleType,
  UsersListResponse,
  CreateUserByAdminReq,
  CreateUserWithCredentialsResponse,
  UpdateUserReq,
  UpdateUserResponse,
  DeleteUserResponse,
} from "@repo/shared";
import {
  QueryKey,
  useQuery,
  UseQueryOptions,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";

const USERS_QUERY_KEY = "users" as const;

export const useUsers = (
  searchQuery?: string,
  role?: RoleType,
  page?: number,
  limit?: number,
  options?: UseQueryOptions<
    UsersListResponse,
    Error,
    UsersListResponse,
    QueryKey
  >
) => {
  const queryKey = [
    USERS_QUERY_KEY,
    "list",
    role ?? "",
    searchQuery ?? "",
    page ?? 1,
    limit ?? 10,
  ];

  // Url Construction
  let url = "/users/list";
  const params = new URLSearchParams();
  if (searchQuery) params.append("q", searchQuery);
  if (role) params.append("role", role);
  if (page) params.append("page", page.toString());
  if (limit) params.append("limit", limit.toString());
  const queryString = params.toString();
  if (queryString) {
    url += `?${queryString}`;
  }

  // Calling the api
  const { data, ...rest } = useQuery({
    queryFn: () => {
      return getRequest<UsersListResponse>(url);
    },
    queryKey: queryKey,
    ...options,
  });

  return {
    users: data?.results || [],
    count: data?.count || 0,
    ...rest,
  };
};

export const useCreateUser = (
  options?: UseMutationOptions<
    CreateUserWithCredentialsResponse,
    Error,
    CreateUserByAdminReq
  >
) => {
  return useMutation({
    mutationFn: (payload: CreateUserByAdminReq) =>
      postRequest<CreateUserWithCredentialsResponse>("/users/create", payload),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};

export const useUpdateUser = (
  options?: UseMutationOptions<
    UpdateUserResponse,
    Error,
    { userId: string; payload: UpdateUserReq }
  >
) => {
  return useMutation({
    mutationFn: ({
      userId,
      payload,
    }: {
      userId: string;
      payload: UpdateUserReq;
    }) => putRequest<UpdateUserResponse>(`/users/${userId}`, payload),
    onSuccess: (data, variables, context) => {
      // Add a small delay to prevent UI freezing during query invalidation
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
      }, 100);

      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};

export const useDeleteUser = (
  options?: UseMutationOptions<DeleteUserResponse, Error, string>
) => {
  return useMutation({
    mutationFn: (userId: string) =>
      deleteRequest<DeleteUserResponse>(`/users/${userId}`),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};
