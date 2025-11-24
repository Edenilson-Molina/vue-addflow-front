// Clase de error de dominio
export class AppHttpError extends Error {
  constructor({ message, status, code, data }) {
    super(message)
    this.name = 'AppHttpError'
    this.status = status
    this.code = code
    this.data = data
  }
}

// Mapea respuesta Axios a AppHttpError
export function mapAxiosError(error) {
  const status = error?.response?.status
  const data = error?.response?.data
  const code = data?.code || `HTTP_${status || 'UNKNOWN'}`
  const message = data?.message || error.message || 'Error inesperado'
  return new AppHttpError({ message, status, code, data })
}

// Mensajes estándar para UI
export function friendlyMessage(appError) {
  if (!appError.status) return 'Error de red. Verifica tu conexión.'
  if (appError.status === 401) return 'Sesión expirada. Inicia nuevamente.'
  if (appError.status === 403) return 'Acceso denegado.'
  if (appError.status === 404) return 'Recurso no encontrado.'
  if (appError.status >= 500) return 'Error del servidor. Intenta más tarde.'
  return appError.message
}
