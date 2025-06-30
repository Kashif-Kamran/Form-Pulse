import { getRequest } from "@/lib/client/common";
import { 
  VaccinationStatusResponse,
  TopVaccinesResponse,
  HealthAlertsResponse
} from "@repo/shared";
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

export const useVaccinationStatus = (
  options?: UseQueryOptions<
    VaccinationStatusResponse,
    Error,
    VaccinationStatusResponse,
    QueryKey
  >
) => {
  const queryKey = [DASHBOARD_QUERY_KEY, "vaccination-status"];
  const { data, ...rest } = useQuery({
    queryKey,
    queryFn: () =>
      getRequest<VaccinationStatusResponse>("/dashboard/vaccination-status"),
    ...options,
  });

  return {
    vaccinationStatus: data?.data?.data || [],
    total: data?.data?.total || 0,
    ...rest,
  };
};

export const useTopVaccines = (
  options?: UseQueryOptions<
    TopVaccinesResponse,
    Error,
    TopVaccinesResponse,
    QueryKey
  >
) => {
  const queryKey = [DASHBOARD_QUERY_KEY, "top-vaccines"];
  const { data, ...rest } = useQuery({
    queryKey,
    queryFn: () =>
      getRequest<TopVaccinesResponse>("/dashboard/top-vaccines"),
    ...options,
  });

  return {
    topVaccines: data?.data?.data || [],
    total: data?.data?.total || 0,
    ...rest,
  };
};

export const useHealthAlerts = (
  options?: UseQueryOptions<
    HealthAlertsResponse,
    Error,
    HealthAlertsResponse,
    QueryKey
  >
) => {
  const queryKey = [DASHBOARD_QUERY_KEY, "health-alerts"];
  const { data, ...rest } = useQuery({
    queryKey,
    queryFn: () =>
      getRequest<HealthAlertsResponse>("/dashboard/health-alerts"),
    ...options,
  });

  return {
    healthAlerts: data?.data?.data || [],
    total: data?.data?.total || 0,
    ...rest,
  };
};
