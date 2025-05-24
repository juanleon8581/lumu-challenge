import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 5,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: true,
      refetchInterval: 2 * 60 * 1000,
    },
  },
});
