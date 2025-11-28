import { QueryClient } from '@tanstack/vue-query'

// Crear QueryClient con opciones globales
function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        staleTime: 30_000, // 30s
        cacheTime: 5 * 60_000, // 5 min
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        refetchOnMount: false,
        // onError: (error) => {
        //   try {
        //     const notify = useNotify()
        //     notify.error(friendlyMessage(error))
        //   } catch (_) {}
        // }
      },
      mutations: {
        retry: 0,
        // onError: (error) => {
        //   try {
        //     const notify = useNotify()
        //     notify.error(friendlyMessage(error))
        //   } catch (_) {}
        // }
      }
    }
  })
}

export const queryClient = createQueryClient()
