import { postRequest } from "@/lib/client/common";
import { queryClient } from "@/lib/query-client";
import {
  NotifyNutritionistReq,
  NotifyNutritionistResponse,
  CreateNotificationReq,
  NotificationResponse,
} from "@repo/shared";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

const NOTIFICATION_QUERY_KEY = "notification" as const;

export const useNotifyNutritionist = (
  options?: UseMutationOptions<
    NotifyNutritionistResponse,
    Error,
    NotifyNutritionistReq
  >
) => {
  return useMutation({
    mutationFn: (payload: NotifyNutritionistReq) =>
      postRequest<NotifyNutritionistResponse>(
        "/notifications/nutritionist",
        payload
      ),
    onSuccess: (data: any, variables: any, context: any) => {
      // Optionally invalidate notification-related queries
      queryClient.invalidateQueries({
        queryKey: [NOTIFICATION_QUERY_KEY],
      });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};

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
