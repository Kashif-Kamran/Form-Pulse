import { getRequest, postRequest } from "@/lib/client/common";
import { queryClient } from "@/lib/query-client";
import {
  AnimalHealthRecordsListResponse,
  CreateAnimalHealthRecordReq,
  CreateAnimalHealthRecordResponse,
  HealthRecordListResponse,
  HealthRecordResponseItem,
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

export const useHealthRecordsByAnimalId = (
  animalId: string,
  options?: UseQueryOptions<
    HealthRecordListResponse,
    Error,
    HealthRecordListResponse,
    QueryKey
  >
) => {
  const queryKey = ["NEW_HEALTH_RECORD", "list", animalId];
  const { data, ...rest } = useQuery({
    queryFn: async () => {
      const url = `/animal-health-record/${animalId}`;
      const apiResponse = await getRequest<HealthRecordListResponse>(url);
      const mappedData: HealthRecordResponseItem[] = apiResponse.results.map(
        (item) => {
          return {
            ...item,
            administeredDate: item.administeredDate
              ? new Date(item.administeredDate)
              : null,
            dueDate: new Date(item.dueDate),
          };
        }
      );

      return { count: apiResponse.count, results: mappedData };
    },
    queryKey: queryKey,
    ...options,
  });
  return { ...data, ...rest };
};
