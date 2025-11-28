import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { VueSpinnersPlugin } from 'vue3-spinners'

import App from './App.vue'
import router from './router'
import { setupPrimeVue } from '@/plugins/primevue'
import { setupNotivue } from '@/plugins/notivue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { queryClient } from '@/plugins/query'

const pinia = createPinia().use(piniaPluginPersistedstate)

const app = createApp(App)
    .use(pinia)
    .use(router)
    .use(VueSpinnersPlugin)
    .use(VueQueryPlugin, { queryClient })

setupPrimeVue(app)
setupNotivue(app)

app.mount('#app')
