import { getRequest } from "@/lib/client/common";
import {
  VaccinationStatusResponse,
  TopVaccinesResponse,
  HealthAlertsResponse,
  FeedStockLevelsResponse,
  FeedUsageResponse,
  DietPlansStatusResponse,
  UserRolesResponse,
  VerificationStatusResponse,
  ActivityResponse,
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
    queryFn: () => getRequest<TopVaccinesResponse>("/dashboard/top-vaccines"),
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
    queryFn: () => getRequest<HealthAlertsResponse>("/dashboard/health-alerts"),
    ...options,
  });

  return {
    healthAlerts: data?.data?.data || [],
    total: data?.data?.total || 0,
    ...rest,
  };
};

export const useFeedStockLevels = (
  options?: UseQueryOptions<
    FeedStockLevelsResponse,
    Error,
    FeedStockLevelsResponse,
    QueryKey
  >
) => {
  const queryKey = [DASHBOARD_QUERY_KEY, "feed-stock-levels"];
  const { data, ...rest } = useQuery({
    queryKey,
    queryFn: () =>
      getRequest<FeedStockLevelsResponse>("/dashboard/feed-stock-levels"),
    ...options,
  });

  return {
    feedStockLevels: data?.data?.data || [],
    total: data?.data?.total || 0,
    ...rest,
  };
};

export const useFeedUsage = (
  options?: UseQueryOptions<
    FeedUsageResponse,
    Error,
    FeedUsageResponse,
    QueryKey
  >
) => {
  const queryKey = [DASHBOARD_QUERY_KEY, "feed-usage"];
  const { data, ...rest } = useQuery({
    queryKey,
    queryFn: () => getRequest<FeedUsageResponse>("/dashboard/feed-usage"),
    ...options,
  });

  return {
    feedUsage: data?.data?.data || [],
    total: data?.data?.total || 0,
    ...rest,
  };
};

export const useDietPlansStatus = (
  options?: UseQueryOptions<
    DietPlansStatusResponse,
    Error,
    DietPlansStatusResponse,
    QueryKey
  >
) => {
  const queryKey = [DASHBOARD_QUERY_KEY, "diet-plans-status"];
  const { data, ...rest } = useQuery({
    queryKey,
    queryFn: () =>
      getRequest<DietPlansStatusResponse>("/dashboard/diet-plans-status"),
    ...options,
  });

  return {
    dietPlansStatus: data?.data?.data || [],
    total: data?.data?.total || 0,
    compliance: data?.data?.compliance || 0,
    ...rest,
  };
};

export const useUserRoles = (
  options?: UseQueryOptions<
    UserRolesResponse,
    Error,
    UserRolesResponse,
    QueryKey
  >
) => {
  const queryKey = [DASHBOARD_QUERY_KEY, "user-roles"];
  const { data, ...rest } = useQuery({
    queryKey,
    queryFn: () => getRequest<UserRolesResponse>("/dashboard/user-roles"),
    ...options,
  });

  return {
    userRoles: data?.data?.data || [],
    total: data?.data?.total || 0,
    ...rest,
  };
};

export const useVerificationStatus = (
  options?: UseQueryOptions<
    VerificationStatusResponse,
    Error,
    VerificationStatusResponse,
    QueryKey
  >
) => {
  const queryKey = [DASHBOARD_QUERY_KEY, "verification-status"];
  const { data, ...rest } = useQuery({
    queryKey,
    queryFn: () =>
      getRequest<VerificationStatusResponse>("/dashboard/verification-status"),
    ...options,
  });

  return {
    verificationStatus: data?.data?.data || [],
    total: data?.data?.total || 0,
    verificationRate: data?.data?.verificationRate || 0,
    ...rest,
  };
};

export const useActivity = (
  options?: UseQueryOptions<ActivityResponse, Error, ActivityResponse, QueryKey>
) => {
  const queryKey = [DASHBOARD_QUERY_KEY, "activity"];
  const { data, ...rest } = useQuery({
    queryKey,
    queryFn: () => getRequest<ActivityResponse>("/dashboard/activity"),
    ...options,
  });

  return {
    activity: data?.data?.data || [],
    total: data?.data?.total || 0,
    ...rest,
  };
};
