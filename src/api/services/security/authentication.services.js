import { httpClient } from '@/api/httpClient'

// Adaptadores de datos (DTO -> Domain) por si luego necesitas más campos.
function mapUser(dto) {
  if (!dto) return null
  return {
    id: dto.id,
    name: dto.name,
    email: dto.email,
    roles: dto.roles || []
  }
}

export async function login(credentials) {
  const { data } = await httpClient.post('/auth/login', credentials)
  return {
    token: data.token,
    user: mapUser(data.user)
  }
}

export async function refreshToken() {
  const { data } = await httpClient.post('/auth/refresh')
  return { token: data.token }
}

export async function logout() {
  await httpClient.post('/auth/logout')
  return true
}