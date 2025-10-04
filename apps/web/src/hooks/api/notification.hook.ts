import {
  getRequest,
  postRequest,
  patchRequest,
  deleteRequest,
} from "@/lib/client/common";
import { queryClient } from "@/lib/query-client";
import {
  CreateNotificationReq,
  NotificationResponse,
  NotificationListResponse,
  NotificationDualListResponse,
  NotificationDeleteResponse,
  GetNotificationsQueryReq,
  UpdateNotificationStatusReq,
} from "@repo/shared";
import {
  useMutation,
  useQuery,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";

const NOTIFICATION_QUERY_KEY = "notification" as const;

export const useCreateNotification = (
  options?: UseMutationOptions<
    NotificationResponse,
    Error,
    CreateNotificationReq
  >
) => {
  return useMutation({
    mutationFn: (payload: CreateNotificationReq) =>
      postRequest<NotificationResponse>("/notifications", payload),
    onSuccess: (data: any, variables: any, context: any) => {
      // Invalidate notification-related queries to refresh the lists
      queryClient.invalidateQueries({
        queryKey: [NOTIFICATION_QUERY_KEY],
      });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};

// Query hooks for fetching notifications
export const useNotifications = (
  params?: GetNotificationsQueryReq,
  options?: UseQueryOptions<NotificationListResponse, Error>
) => {
  return useQuery({
    queryKey: [NOTIFICATION_QUERY_KEY, "list", params],
    queryFn: () =>
      getRequest<NotificationListResponse>("/notifications", params),
    ...options,
  });
};

export const useNotificationsDualList = (
  options?: UseQueryOptions<NotificationDualListResponse, Error>
) => {
  return useQuery({
    queryKey: [NOTIFICATION_QUERY_KEY, "dual-list"],
    queryFn: () =>
      getRequest<NotificationDualListResponse>("/notifications/dual-list"),
    ...options,
  });
};

// Mutation hooks for notification actions
export const useMarkNotificationAsRead = (
  options?: UseMutationOptions<NotificationResponse, Error, string>
) => {
  return useMutation({
    mutationFn: (notificationId: string) =>
      patchRequest<NotificationResponse>(
        `/notifications/${notificationId}/read`
      ),
    onSuccess: (data: any, variables: any, context: any) => {
      // Invalidate notification queries to refresh the lists
      queryClient.invalidateQueries({
        queryKey: [NOTIFICATION_QUERY_KEY],
      });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};

export const useUpdateNotificationStatus = (
  options?: UseMutationOptions<
    NotificationResponse,
    Error,
    { id: string; data: UpdateNotificationStatusReq }
  >
) => {
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateNotificationStatusReq;
    }) =>
      patchRequest<NotificationResponse>(`/notifications/${id}/status`, data),
    onSuccess: (data: any, variables: any, context: any) => {
      // Invalidate notification queries to refresh the lists
      queryClient.invalidateQueries({
        queryKey: [NOTIFICATION_QUERY_KEY],
      });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};

export const useDeleteNotification = (
  options?: UseMutationOptions<NotificationDeleteResponse, Error, string>
) => {
  return useMutation({
    mutationFn: (notificationId: string) =>
      deleteRequest<NotificationDeleteResponse>(
        `/notifications/${notificationId}`
      ),
    onSuccess: (data: any, variables: any, context: any) => {
      // Invalidate notification queries to refresh the lists
      queryClient.invalidateQueries({
        queryKey: [NOTIFICATION_QUERY_KEY],
      });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};

export const useMarkAllNotificationsAsRead = (
  options?: UseMutationOptions<
    { success: boolean; message: string },
    Error,
    void
  >
) => {
  return useMutation({
    mutationFn: () =>
      patchRequest<{ success: boolean; message: string }>(
        "/notifications/mark-all-read"
      ),
    onSuccess: (data: any, variables: any, context: any) => {
      // Invalidate notification queries to refresh the lists
      queryClient.invalidateQueries({
        queryKey: [NOTIFICATION_QUERY_KEY],
      });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};

// Query hook for unread notification count with 20-second refresh
export const useUnreadNotificationCount = (
  options?: UseQueryOptions<{ unreadCount: number }, Error>
) => {
  return useQuery({
    queryKey: [NOTIFICATION_QUERY_KEY, "unread-count"],
    queryFn: () =>
      getRequest<{ unreadCount: number }>("/notifications/unread-count"),
    refetchInterval: 20000, // Refetch every 20 seconds
    staleTime: 20000, // Consider data stale after 20 seconds
    ...options,
  });
};
