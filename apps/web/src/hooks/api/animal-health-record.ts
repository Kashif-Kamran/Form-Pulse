import { postRequest } from "@/lib/client/common";
import { queryClient } from "@/lib/query-client";
import {
  CreateAnimalHealthRecordReq,
  CreateAnimalHealthRecordResponse,
} from "@repo/shared";
import { MutationOptions, useMutation } from "@tanstack/react-query";

const HEALTH_QUERY_KEY = "animal-health-list";

export const useCreateAnimalHealthRecord = (
  options?: MutationOptions<
    CreateAnimalHealthRecordResponse,
    Error,
    CreateAnimalHealthRecordReq
  >
) => {
  return useMutation({
    mutationFn: (payload: CreateAnimalHealthRecordReq) =>
      postRequest<CreateAnimalHealthRecordResponse>(
        "/animal-health-record",
        payload
      ),
    onSuccess: (data: any, variables: any, context: any) => {
      queryClient.invalidateQueries({ queryKey: [HEALTH_QUERY_KEY, "list"] });
      options?.onSuccess?.(data, variables, context);
    },
  });
};
