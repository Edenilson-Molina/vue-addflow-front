import { httpClient } from '@/api/httpClient'
import * as authServices from '@/api/services/security/authentication.services'

// Plugin que expone los servicios del API
export function setupApi(app) {
  // Provide para script setup
  app.provide('api', httpClient)
  app.provide('security', { auth: authServices })
}