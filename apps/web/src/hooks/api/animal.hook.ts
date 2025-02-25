import { getRequest } from "@/lib/client/common";
import { AnimalListResponse } from "@repo/shared";
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useAnimals = (
  options?: UseQueryOptions<
    AnimalListResponse,
    Error,
    AnimalListResponse,
    QueryKey
  >
) => {
  const { data, ...rest } = useQuery({
    queryFn: () => getRequest<AnimalListResponse>("/animals"),
    queryKey: ["animals", "list"],
    ...options,
  });

  return { ...data, ...rest };
};
