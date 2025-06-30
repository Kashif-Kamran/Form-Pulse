import { getRequest } from "@/lib/client/common";
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";

const DASHBOARD_QUERY_KEY = "dashboard" as const;

type SpeciesDistributionItem = {
  species: string;
  count: number;
  percentage: number;
};

type SpeciesDistributionResponse = {
  success: boolean;
  data: {
    data: SpeciesDistributionItem[];
    total: number;
  };
};

type AgeDistributionItem = {
  ageGroup: string;
  count: number;
  percentage: number;
  minAge: number;
  maxAge: number;
};

type AgeDistributionResponse = {
  success: boolean;
  data: {
    data: AgeDistributionItem[];
    total: number;
  };
};

export const useSpeciesDistribution = (
  options?: UseQueryOptions<
    SpeciesDistributionResponse,
    Error,
    SpeciesDistributionResponse,
    QueryKey
  >
) => {
  const queryKey = [DASHBOARD_QUERY_KEY, "species-distribution"];
  const { data, ...rest } = useQuery({
    queryKey,
    queryFn: () =>
      getRequest<SpeciesDistributionResponse>(
        "/dashboard/species-distribution"
      ),
    ...options,
  });

  return {
    speciesDistribution: data?.data?.data || [],
    total: data?.data?.total || 0,
    ...rest,
  };
};

export const useAgeDistribution = (
  options?: UseQueryOptions<
    AgeDistributionResponse,
    Error,
    AgeDistributionResponse,
    QueryKey
  >
) => {
  const queryKey = [DASHBOARD_QUERY_KEY, "age-distribution"];
  const { data, ...rest } = useQuery({
    queryKey,
    queryFn: () =>
      getRequest<AgeDistributionResponse>("/dashboard/age-distribution"),
    ...options,
  });

  return {
    ageDistribution: data?.data?.data || [],
    total: data?.data?.total || 0,
    ...rest,
  };
};
