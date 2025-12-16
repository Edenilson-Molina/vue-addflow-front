<template>
    <nav class="flex justify-between items-center h-20 px-8">
        <button @click="toggleSidebar" class="flex items-center">
            <span class="material-icons-round">
                menu
            </span>
        </button>
        <div class="flex items-center gap-2">
            <div class="text-end leading-normal">
                <span class="">{{ user.name }}</span>
                <p class="text-sm font-medium uppercase tracking-wider">{{ user.roles[0] }}</p>
            </div>
            <div class="relative">
                <img src="@/assets/img/logo.png" alt="logo" class="h-14 w-14 border-4 hover:border-blue-500 rounded-full shadow-lg shadow-blue-50 hover:scale-105 transition-all duration-300"/>
            </div>
        </div>
    </nav>
</template>
<script setup>
import { useSessionStore } from '@/stores/index.store'
const sessionStore = useSessionStore()

const { user } = storeToRefs(sessionStore)
const toggleSidebar = () => {
    sessionStore.setFlagSidebar();
}
</script>