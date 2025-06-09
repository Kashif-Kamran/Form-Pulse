import { getRequest, postRequest } from "@/lib/client/common";
import { queryClient } from "@/lib/query-client";
import {
  AnimalHealthRecordsListResponse,
  CreateAnimalHealthRecordReq,
  CreateAnimalHealthRecordResponse,
} from "@repo/shared";
import {
  MutationOptions,
  QueryKey,
  useMutation,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

const HEALTH_QUERY_KEY = "animal-health-list";

export const useCreateAnimalHealthRecord = (
  options?: MutationOptions<
    CreateAnimalHealthRecordResponse,
    Error,
    CreateAnimalHealthRecordReq
  >
) => {
  return useMutation({
    mutationFn: (payload: CreateAnimalHealthRecordReq) =>
      postRequest<CreateAnimalHealthRecordResponse>(
        "/animal-health-record",
        payload
      ),
    onSuccess: (data: any, variables: any, context: any) => {
      queryClient.invalidateQueries({ queryKey: [HEALTH_QUERY_KEY, "list"] });
      options?.onSuccess?.(data, variables, context);
    },
  });
};

export const useAnimalsHealthRecords = (
  options?: UseQueryOptions<
    AnimalHealthRecordsListResponse,
    Error,
    AnimalHealthRecordsListResponse,
    QueryKey
  >
) => {
  const queryKey = [HEALTH_QUERY_KEY, "list"];
  const { data, ...rest } = useQuery({
    queryFn: () => {
      const url = "/animal-health-record";
      return getRequest<AnimalHealthRecordsListResponse>(url);
    },
    queryKey: queryKey,
    ...options,
  });
  return { ...data, ...rest };
};
