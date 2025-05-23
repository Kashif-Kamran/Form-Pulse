import { deleteRequest, getRequest, postRequest } from "@/lib/client/common";
import { queryClient } from "@/lib/query-client";
import {
  AnimalDeleteResponse,
  AnimalListResponse,
  AnimalResponse,
  CreateAnimalReq,
  CreateVaccineReq,
  CreateVaccineResponse,
} from "@repo/shared";
import {
  MutationOptions,
  QueryKey,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

const VACCINE_QUERY_KEY = "vaccine" as const;

// export const useAnimals = (
//   query?: string,
//   options?: UseQueryOptions<
//     AnimalListResponse,
//     Error,
//     AnimalListResponse,
//     QueryKey
//   >
// ) => {
//   const queryKey = [ANIMALS_QUERY_KEY, "list", query ?? ""];
//   const { data, ...rest } = useQuery({
//     queryFn: () => {
//       let url = "/animals";
//       if (query) url += `?q=${encodeURIComponent(query)}`;
//       return getRequest<AnimalListResponse>(url);
//     },
//     queryKey: queryKey,
//     ...options,
//   });

//   return { ...data, ...rest };
// };

export const useCreateVaccine = (
  options?: MutationOptions<CreateVaccineResponse, Error, CreateVaccineReq>
) => {
  return useMutation({
    mutationFn: (payload: CreateVaccineReq) =>
      postRequest<CreateVaccineResponse>("/vaccine", payload),
    onSuccess: (data: any, variables: any, context: any) => {
      queryClient.invalidateQueries({ queryKey: [VACCINE_QUERY_KEY, "list"] });
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
//     queryKey: [ANIMALS_QUERY_KEY, animalId],
//     queryFn: () => getRequest<AnimalResponse>(`/animals/${animalId}`),
//     ...options,
//   });
//   return { data, ...rest };
// };

// export const useDeleteAnimalById = (
//   options?: UseMutationOptions<
//     AnimalDeleteResponse,
//     Error,
//     { animalId: string }
//   >
// ) => {
//   return useMutation({
//     mutationFn: ({ animalId }) => deleteRequest(`/animals/${animalId}`),
//     onSuccess: (data, variables, context) => {
//       queryClient.invalidateQueries({ queryKey: [ANIMALS_QUERY_KEY, "list"] });
//       options?.onSuccess?.(data, variables, context);
//     },
//     ...options,
//   });
// };
