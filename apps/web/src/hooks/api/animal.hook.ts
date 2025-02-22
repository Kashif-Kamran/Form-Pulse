import { getRequest } from "@/lib/client/common";
import { AniamlsListResponse } from "@/types/api";
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useAnimals = (
  options?: UseQueryOptions<
    AniamlsListResponse,
    Error,
    AniamlsListResponse,
    QueryKey
  >
) => {
  const { data, ...rest } = useQuery({
    queryFn: () => getRequest<AniamlsListResponse>("/animals"),
    queryKey: ["animals", "list"],
    ...options,
  });

  return { ...data, ...rest };
};
