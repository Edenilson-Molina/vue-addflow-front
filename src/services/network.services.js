import axios from "axios"
import { useAuthStore } from '@/stores/auth.store'
import { useToastStore } from '@/stores/index.store'

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
        const { token } = authStore

        if (token && config.headers !== null) {
            config.headers.Authorization = `Bearer ${token}`
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
        const rootStore = useToastStore()
        
        rootStore.setNotification({
            message: error.response.data.message,
            type: 'error',
        })
    }
)

export default instance