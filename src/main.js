import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

// Primevue
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import ToastService from 'primevue/toastservice';
import 'primeicons/primeicons.css'
import InputTex from 'primevue/inputtext'
import Button from 'primevue/button'
import Fieldset from 'primevue/fieldset'
import Message from 'primevue/message'
import Toast from 'primevue/toast';

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// Register global components Primevue
app.component('Button', Button);
app.component('InputText', InputTex);
app.component('Fieldset', Fieldset);
app.component('Message', Message);
app.component('Toast', Toast);
 
// Installation plugin 
app.use(pinia)
app.use(router)
app.use(ToastService)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            cssLayer: {
                name: 'primevue',
                order: 'tailwind-base, primevue, tailwind-utilities'
            }
        }
    }
 });


app.mount('#app')
