import { mapAxiosError, friendlyMessage } from '../errors'
import { useNotify } from '@/composables/useNotify'

export function attachResponseInterceptor(instance) {
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const appError = mapAxiosError(error)
      // Notificar
      try {
        const notify = useNotify()
        notify.error(friendlyMessage(appError))
      } catch (_) {}
      return Promise.reject(appError)
    }
  )
}
