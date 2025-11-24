import { useSessionStore } from '@/stores/index.store'
import { storeToRefs } from 'pinia'

export function attachRequestInterceptor(instance) {
  instance.interceptors.request.use(
    (config) => {
      // Token
      try {
        const session = useSessionStore()
        const { token } = storeToRefs(session)
        if (token?.value) {
          config.headers = config.headers || {}
          config.headers.Authorization = `Bearer ${token.value}`
        }
      } catch (_) {}

      // Ejemplo de correlación (podrías usar uuid)
      config.headers['x-request-id'] = crypto.randomUUID?.() || Date.now().toString()
      return config
    },
    (error) => Promise.reject(error)
  )
}
