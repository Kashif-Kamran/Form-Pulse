import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 90000,
      retry: (failureCount, error: any) => {
        // Don't retry on 401 errors
        if (error?.status === 401) {
          return false;
        }
        // Only retry once for other errors
        return failureCount < 1;
      },
    },
  },
});
