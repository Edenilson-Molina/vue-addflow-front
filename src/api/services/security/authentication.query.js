import { useMutation } from '@tanstack/vue-query'
import { useSessionStore } from '@/stores/index.store'
import { useRouter } from 'vue-router'
import { QUERY_KEYS } from './keys.query'
import * as authServices from '@/api/services/security/authentication.services'

function requestLogin() {
  const sessionStore = useSessionStore()
  const router = useRouter()
  return useMutation({
    mutationFn: (credentials) => authServices.login(credentials),
    onSuccess: (data) => {
      sessionStore.setAuthData(data)
      router.push({ name: 'home' })
    }
  })
}

export { requestLogin }