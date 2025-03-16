import { getRequest } from "@/lib/client/common";
import { AnimalDietPlanListResponse } from "@repo/shared";
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { mapDataToAnimalDietPlanPublic } from "./mappers/diet-plan.mapper";

const ANIMALS_QUERY_KEY = "animals" as const;
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
    queryKey: [DIET_PLAN_QUERY_KEY],
    ...options,
  });

  return { ...data, ...rest };
};

// const useCreateDietPlan = async (
//   animalId: string,
//   options?: UseMutationOptions<
//     CreateAnimalDietPlanResponse,
//     Error,
//     CreateDietPlanReq
//   >
// ) => {
//   return useMutation({
//     mutationFn: (payload: CreateDietPlanReq) =>
//       postRequest(`/animals/${animalId}/diet-plan`),
//   });
// };
