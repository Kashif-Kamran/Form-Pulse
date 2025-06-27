import { postRequest } from "@/lib/client/common";
import { queryClient } from "@/lib/query-client";
import {
  NotifyNutritionistReq,
  NotifyNutritionistResponse,
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
