import { getRequest, postRequest } from "@/lib/client/common";
import { queryClient } from "@/lib/query-client";
import {
  CreateVaccineReq,
  CreateVaccineResponse,
  VaccineListResponse,
} from "@repo/shared";
import {
  MutationOptions,
  QueryKey,
  useMutation,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

const VACCINE_QUERY_KEY = "vaccine" as const;

export const useVaccines = (
  query?: string,
  type?: string,
  options?: UseQueryOptions<
    VaccineListResponse,
    Error,
    VaccineListResponse,
    QueryKey
  >
) => {
  let url = "/vaccine/list";
  const queryKey = [VACCINE_QUERY_KEY, "list", query ?? "", type ?? ""];
  const params = new URLSearchParams();
  if (type?.trim()) params.append("type", type);
  if (query) params.append("q", query);
  const queryString = params.toString();
  if (queryString) {
    url += `?${queryString}`;
  }
  const { data, ...rest } = useQuery({
    queryFn: () => {
      return getRequest<VaccineListResponse>(url);
    },
    queryKey,
    ...options,
  });

  return { ...data, ...rest };
};

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
