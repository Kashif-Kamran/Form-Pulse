import { getRequest } from "@/lib/client/common";
import { RoleType, UserListResponse } from "@repo/shared";
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";

const USERS_QUERY_KEY = "users" as const;

export const useUsers = (
  searchQuery?: string,
  role?: RoleType,
  options?: UseQueryOptions<UserListResponse, Error, UserListResponse, QueryKey>
) => {
  const queryKey = [USERS_QUERY_KEY, "list", role ?? "", searchQuery ?? ""];
  // Url Construction
  let url = "/users/list";
  const params = new URLSearchParams();
  if (searchQuery) params.append("q", searchQuery);
  if (role) params.append("role", role);
  const queryString = params.toString();
  if (queryString) {
    url += `?${queryString}`;
  }
  //  Calling the api
  const { data, ...rest } = useQuery({
    queryFn: () => {
      return getRequest<UserListResponse>(url);
    },
    queryKey: queryKey,
    ...options,
  });
  return { ...data, ...rest };
};
