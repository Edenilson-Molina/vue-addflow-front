<template>
    <header>
        <sidebar />
    </header>
    <main class="grow flex px-8 pt-20">
        <button @click="toggleSidebar" class="top-0 left-0 fixed p-8">
            <span class="material-icons-round">
                menu
            </span>
        </button>
        <div class="absolute z-[-2] bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_100%_30%_at_50%_0%,#000_10%,transparent_120%)]"></div>
        <router-view />
    </main>
    <footer class="text-white p-4 w-full">
        <div class="container mx-auto text-center">
            © 2025 Flujo de Caja. Todos los derechos reservados.
        </div>
    </footer>
</template>

<script setup>
import { useSessionStore } from '@/stores/index.store'
const sessionStore = useSessionStore()
const { flagSidebar } = storeToRefs(sessionStore)
const toggleSidebar = () => {
    sessionStore.setFlagSidebar();
}
</script>
