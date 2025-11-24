import axios from 'axios'
import { attachRequestInterceptor } from './interceptors/request'
import { attachResponseInterceptor } from './interceptors/response'

// Factory que crea la instancia Axios con configuración base.
export function createHttpClient({ baseURL = import.meta.env.VITE_VUE_APP_API_URL + '/api', timeout = 15000 } = {}) {
  const instance = axios.create({
    baseURL,
    timeout,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })
  attachRequestInterceptor(instance)
  attachResponseInterceptor(instance)
  return instance
}

// Instancia singleton por defecto para la app.
export const httpClient = createHttpClient()

// Helpers de cancelación
export function createCancelToken() {
  const controller = new AbortController()
  return { signal: controller.signal, cancel: () => controller.abort() }
}
