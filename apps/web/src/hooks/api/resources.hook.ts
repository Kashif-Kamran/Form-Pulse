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

// Helper function to refresh resources cache
export const refreshResourcesCache = async () => {
  // Invalidate the cache first
  await queryClient.invalidateQueries({
    queryKey: [RESOURCES_QUERY_KEY, "list"],
  });
  
  // Then refetch the data
  await queryClient.refetchQueries({
    queryKey: [RESOURCES_QUERY_KEY, "list"],
  });
};

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
    onSuccess: async (data: any, variables: any, context: any) => {
      // Always refresh resources cache first
      await refreshResourcesCache();
      
      // Then call the user's onSuccess callback if provided
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    onError: (error: any, variables: any, context: any) => {
      // Also invalidate on error in case of partial state issues
      queryClient.invalidateQueries({
        queryKey: [RESOURCES_QUERY_KEY, "list"],
      });
      
      // Call the user's onError callback if provided
      if (options?.onError) {
        options.onError(error, variables, context);
      }
    },
    // Spread other options but exclude onSuccess and onError to avoid conflicts
    ...Object.fromEntries(
      Object.entries(options || {}).filter(([key]) => 
        !['onSuccess', 'onError'].includes(key)
      )
    ),
  });
};

export const useDeleteResource = (
  options?: MutationOptions<ResourceDocumentDeleteResponse, Error, string>
) => {
  return useMutation({
    mutationFn: (filename: string) =>
      deleteRequest<ResourceDocumentDeleteResponse>(`/resources/${filename}`),
    onMutate: async (filename: string) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: [RESOURCES_QUERY_KEY, "list"] });

      // Snapshot the previous value
      const previousResources = queryClient.getQueryData([RESOURCES_QUERY_KEY, "list"]);

      // Optimistically update to remove the item
      queryClient.setQueryData([RESOURCES_QUERY_KEY, "list"], (old: any) => {
        if (!old?.results) return old;
        return {
          ...old,
          results: old.results.filter((doc: any) => doc.filename !== filename)
        };
      });

      // Return a context object with the snapshotted value
      return { previousResources };
    },
    onSuccess: async (data: any, variables: any, context: any) => {
      // Always refresh resources cache first
      await refreshResourcesCache();
      
      // Then call the user's onSuccess callback if provided
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    onError: (error: any, variables: any, context: any) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousResources) {
        queryClient.setQueryData([RESOURCES_QUERY_KEY, "list"], context.previousResources);
      }
      
      // Call the user's onError callback if provided
      if (options?.onError) {
        options.onError(error, variables, context);
      }
    },
    onSettled: () => {
      // Always refetch after error or success to ensure consistency
      queryClient.invalidateQueries({
        queryKey: [RESOURCES_QUERY_KEY, "list"],
      });
    },
    // Spread other options but exclude callbacks to avoid conflicts
    ...Object.fromEntries(
      Object.entries(options || {}).filter(([key]) => 
        !['onSuccess', 'onError', 'onMutate', 'onSettled'].includes(key)
      )
    ),
  });
};
