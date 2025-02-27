import { getRequest, postRequest } from "@/lib/client/common";
import { queryClient } from "@/lib/query-client";
import {
  CreateNewFeedItemReq,
  FeedInventoryListResponse,
  FeedItemResponse,
} from "@repo/shared";
import {
  MutationOptions,
  QueryKey,
  useMutation,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

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

export const useCreateFeedInventory = (
  options?: MutationOptions<FeedItemResponse, Error, CreateNewFeedItemReq>
) => {
  return useMutation({
    mutationFn: (payload: CreateNewFeedItemReq) =>
      postRequest<FeedItemResponse>("/feed-inventory", payload),
    onSuccess: (data: any, variables: any, context: any) => {
      queryClient.invalidateQueries({
        queryKey: [FEED_INVENTORY_QUERY_KEY, "list"],
      });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};

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
