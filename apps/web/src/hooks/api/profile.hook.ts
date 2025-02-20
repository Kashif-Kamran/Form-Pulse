import { getRequest } from "@/lib/client/common";
import { ProfileResponse } from "@/types/api";
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useMe = (
  options?: UseQueryOptions<ProfileResponse, Error, ProfileResponse, QueryKey>
) => {
  const { data, ...rest } = useQuery({
    queryKey: ["accounts/me"],
    queryFn: () => getRequest<ProfileResponse>("/accounts/me"),
    ...options,
  });

  return {
    data,
    ...rest,
  };
};
