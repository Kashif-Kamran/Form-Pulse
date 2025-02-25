import { getRequest, postRequest } from "@/lib/client/common";
import { queryClient } from "@/lib/query-client";
import {
  AnimalListResponse,
  AnimalResponse,
  CreateAnimalReq,
} from "@repo/shared";
import {
  MutationOptions,
  QueryKey,
  useMutation,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

const ANIMALS_QUERY_KEY = "animals" as const;

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
    queryKey: [ANIMALS_QUERY_KEY, "list"],
    ...options,
  });

  return { ...data, ...rest };
};

export const useCreateAnimal = (
  options?: MutationOptions<AnimalResponse, Error, CreateAnimalReq>
) => {
  return useMutation({
    mutationFn: (payload: CreateAnimalReq) =>
      postRequest<AnimalResponse>("/animals", payload),
    onSuccess: (data: any, variables: any, context: any) => {
      queryClient.invalidateQueries({ queryKey: [ANIMALS_QUERY_KEY, "list"] });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};
