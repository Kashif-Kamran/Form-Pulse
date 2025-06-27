import { getRequest, postRequest } from "@/lib/client/common";
import {
  AnimalDietPlanListResponse,
  CreateAnimalDietPlanResponse,
  CreateDietPlanReq,
} from "@repo/shared";
import {
  QueryKey,
  useQuery,
  UseQueryOptions,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { mapDataToAnimalDietPlanPublic } from "./mappers/diet-plan.mapper";
import { queryClient } from "@/lib/query-client";

const DIET_PLAN_QUERY_KEY = "diet-plan" as const;

export const useDietPlan = (
  options?: UseQueryOptions<
    AnimalDietPlanListResponse,
    Error,
    AnimalDietPlanListResponse,
    QueryKey
  >
) => {
  const { data, ...rest } = useQuery({
    queryFn: async () => {
      const data = await getRequest<AnimalDietPlanListResponse>("/diet-plan");
      const response = {
        ...data,
        results: data.results.map((result) =>
          mapDataToAnimalDietPlanPublic(result)
        ),
      };
      return response;
    },
    queryKey: [DIET_PLAN_QUERY_KEY, "list"],
    ...options,
  });

  return { ...data, ...rest };
};

export const useCreateDietPlan = (
  options?: UseMutationOptions<
    CreateAnimalDietPlanResponse,
    Error,
    { animalId: string; payload: CreateDietPlanReq }
  >
) => {
  return useMutation({
    mutationFn: ({ animalId, payload }) =>
      postRequest<CreateAnimalDietPlanResponse>(
        `/animals/${animalId}/diet-plan`,
        payload
      ),
    onSuccess: (data: any, variables: any, context: any) => {
      queryClient.invalidateQueries({
        queryKey: [DIET_PLAN_QUERY_KEY, "list"],
      });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};

export const useAnimalDietPlan = (
  animalId: string,
  options?: UseQueryOptions<
    AnimalDietPlanListResponse,
    Error,
    AnimalDietPlanListResponse,
    QueryKey
  >
) => {
  const { data, ...rest } = useQuery({
    queryFn: async () => {
      const data = await getRequest<AnimalDietPlanListResponse>(
        `/animals/${animalId}/diet-plan`
      );
      const response = {
        ...data,
        results: data.results.map((result) =>
          mapDataToAnimalDietPlanPublic(result)
        ),
      };
      console.log("Response : ", response);
      return response;
    },
    queryKey: [DIET_PLAN_QUERY_KEY, animalId, "list"],
    ...options,
  });

  return { ...data, ...rest };
};
