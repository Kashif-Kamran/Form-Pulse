import {
  getRequest,
  deleteRequest,
  postFormDataRequest,
} from "@/lib/client/common";
import { queryClient } from "@/lib/query-client";
import {
  ResourceDocumentListResponse,
  ResourceDocumentResponse,
  ResourceDocumentDeleteResponse,
} from "@repo/shared";
import {
  MutationOptions,
  QueryKey,
  useMutation,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

const RESOURCES_QUERY_KEY = "resources" as const;

export const useResources = (
  options?: UseQueryOptions<
    ResourceDocumentListResponse,
    Error,
    ResourceDocumentListResponse,
    QueryKey
  >
) => {
  const queryKey = [RESOURCES_QUERY_KEY, "list"];
  const { data, ...rest } = useQuery({
    queryFn: () => getRequest<ResourceDocumentListResponse>("/resources"),
    queryKey: queryKey,
    ...options,
  });

  return { ...data, ...rest };
};

export const useUploadResource = (
  options?: MutationOptions<ResourceDocumentResponse, Error, File>
) => {
  return useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      return postFormDataRequest<ResourceDocumentResponse>(
        "/resources/upload",
        formData
      );
    },
    onSuccess: (data: any, variables: any, context: any) => {
      queryClient.invalidateQueries({
        queryKey: [RESOURCES_QUERY_KEY, "list"],
      });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};

export const useDeleteResource = (
  options?: MutationOptions<ResourceDocumentDeleteResponse, Error, string>
) => {
  return useMutation({
    mutationFn: (filename: string) =>
      deleteRequest<ResourceDocumentDeleteResponse>(`/resources/${filename}`),
    onSuccess: (data: any, variables: any, context: any) => {
      queryClient.invalidateQueries({
        queryKey: [RESOURCES_QUERY_KEY, "list"],
      });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};
