import { getRequest, postRequest } from "@/lib/client/common";
import { FeedInventoryListResponse } from "@repo/shared";
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";

const FEED_INVENTORY_QUERY_KEY = "feed-inventory" as const;

export const useFeedInventory = (
  options?: UseQueryOptions<
    FeedInventoryListResponse,
    Error,
    FeedInventoryListResponse,
    QueryKey
  >
) => {
  const { data, ...rest } = useQuery({
    queryFn: () => getRequest<FeedInventoryListResponse>("/feed-inventory"),
    queryKey: [FEED_INVENTORY_QUERY_KEY, "list"],
    ...options,
  });

  return { ...data, ...rest };
};

// export const useCreateAnimal = (
//   options?: MutationOptions<AnimalResponse, Error, CreateAnimalReq>
// ) => {
//   return useMutation({
//     mutationFn: (payload: CreateAnimalReq) =>
//       postRequest<AnimalResponse>("/animals", payload),
//     onSuccess: (data: any, variables: any, context: any) => {
//       queryClient.invalidateQueries({
//         queryKey: [FEED_INVENTORY_QUERY_KEY, "list"],
//       });
//       options?.onSuccess?.(data, variables, context);
//     },
//     ...options,
//   });
// };

// export const useAnimalById = (
//   animalId: string,
//   options?: UseQueryOptions<AnimalResponse, Error, AnimalResponse, QueryKey>
// ) => {
//   const { data, ...rest } = useQuery({
//     queryKey: [FEED_INVENTORY_QUERY_KEY, animalId],
//     queryFn: () => getRequest<AnimalResponse>(`/animals/${animalId}`),
//     ...options,
//   });
//   return { data, ...rest };
// };
