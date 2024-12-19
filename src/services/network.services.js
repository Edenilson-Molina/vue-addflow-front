import axios from "axios"
import { useAuthStore } from '@/stores/auth.store'
import { useToastStore } from '@/stores/index.store'
import { storeToRefs } from "pinia"

let config = {
  baseURL: import.meta.env.VITE_VUE_APP_API_URL + '/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
}

const instance = axios.create(config)

// Add auth token to requests
instance.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    const {token} = storeToRefs(authStore)

    if (token && config.headers !== null) {
      config.headers.Authorization = `Bearer ${token.value}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Handle errors
instance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const rootStore = useToastStore();

    rootStore.setNotification({
      message: error.response.data.message,
      type: 'error',
    })

    if (error.response.status === 401) {
      const authStore = useAuthStore();
      const {token, user, authenticated} = storeToRefs(authStore);
      token.value = null;
      user.value = null;
      authenticated.value = false;
    }
  }
)

export default instance
