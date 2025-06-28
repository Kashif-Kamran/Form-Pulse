import { getRequest, postRequest, patchRequest } from "@/lib/client/common";
import { queryClient } from "@/lib/query-client";
import {
  AnimalHealthRecordsListResponse,
  CreateAnimalHealthRecordReq,
  CreateAnimalHealthRecordResponse,
  HealthRecordListResponse,
  HealthRecordResponseItem,
  PopulatedAnimalHealthRecord,
  UpdateAnimalHealthRecordResponse,
  UpdateHealthRecordStatusReq,
  UpdateHealthRecordStatusResponse,
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
      // Invalidate ALL health record related queries to ensure fresh data everywhere
      queryClient.invalidateQueries({ 
        predicate: (query) => {
          const queryKey = query.queryKey;
          return (
            queryKey.includes(HEALTH_QUERY_KEY) ||
            queryKey.includes("NEW_HEALTH_RECORD") ||
            queryKey.includes("animal-health-record")
          );
        }
      });

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
      const url = `/animal-health-record/animal/${animalId}`;
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

export const useUpdateHealthRecordStatus = (
  options?: MutationOptions<
    UpdateHealthRecordStatusResponse,
    Error,
    {
      recordId: string;
      scheduleId: string;
      payload: UpdateHealthRecordStatusReq;
    }
  >
) => {
  return useMutation({
    mutationFn: ({ recordId, scheduleId, payload }) =>
      patchRequest<UpdateHealthRecordStatusResponse>(
        `/animal-health-record/${recordId}/schedule/${scheduleId}`,
        payload
      ),
    onSuccess: (data: any, variables: any, context: any) => {
      // Invalidate ALL health record related queries to ensure fresh data everywhere
      queryClient.invalidateQueries({ 
        predicate: (query) => {
          const queryKey = query.queryKey;
          return (
            queryKey.includes(HEALTH_QUERY_KEY) ||
            queryKey.includes("NEW_HEALTH_RECORD") ||
            queryKey.includes("animal-health-record")
          );
        }
      });

      options?.onSuccess?.(data, variables, context);
    },
  });
};

export const useUpdateHealthRecord = (
  options?: MutationOptions<
    UpdateAnimalHealthRecordResponse,
    Error,
    {
      healthRecordId: string;
      payload: CreateAnimalHealthRecordReq;
    }
  >
) => {
  return useMutation({
    mutationFn: ({ healthRecordId, payload }) =>
      patchRequest<UpdateAnimalHealthRecordResponse>(
        `/animal-health-record/${healthRecordId}`,
        payload
      ),
    onSuccess: (data: any, variables: any, context: any) => {
      // Invalidate ALL health record related queries to ensure fresh data everywhere
      queryClient.invalidateQueries({ 
        predicate: (query) => {
          const queryKey = query.queryKey;
          return (
            queryKey.includes(HEALTH_QUERY_KEY) ||
            queryKey.includes("NEW_HEALTH_RECORD") ||
            queryKey.includes("animal-health-record")
          );
        }
      });

      options?.onSuccess?.(data, variables, context);
    },
  });
};

export const useHealthRecordById = (
  recordId: string,
  options?: UseQueryOptions<
    PopulatedAnimalHealthRecord,
    Error,
    PopulatedAnimalHealthRecord,
    QueryKey
  >
) => {
  const queryKey = [HEALTH_QUERY_KEY, "single", recordId];
  const { data, ...rest } = useQuery({
    queryFn: () => {
      const url = `/animal-health-record/record/${recordId}`;
      return getRequest<{ data: PopulatedAnimalHealthRecord }>(url).then(
        (response) => response.data
      );
    },
    queryKey: queryKey,
    enabled: !!recordId,
    ...options,
  });
  return { data, ...rest };
};
