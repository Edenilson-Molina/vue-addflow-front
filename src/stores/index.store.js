import { defineStore } from "pinia";
import { toast } from "vue3-toastify";
import 'vue3-toastify/dist/index.css';

export const useToastStore = defineStore('app', {
    state: () => ({
        
    }),
    actions: {
        setNotification({ message, type }) {
            toast(message, { 
                type, 
                position: 'top-right', 
                pauseOnHover: true, 
                icon: true,
            })
        },
    },
});