<template>
    <transition name="sidebar-fade">
        <aside
            v-show="flagSidebar"
            class="flex flex-col fixed top-0 left-0 w-72 h-full bg-white shadow-md z-20"
        >
            <div class="flex relative flex-col items-center gap-1 justify-center py-8 border-b border-gray-100">
                <button @click="toggleSidebar" class="absolute top-0 right-0 p-3">
                    <span class="material-icons-round">
                        close
                    </span>
                </button>
                <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div class="relative">
                    <img src="@/assets/img/logo.png" alt="logo" class="h-20 w-20 rounded-full shadow-lg shadow-blue-50 hover:scale-105 transition-transform duration-300"/>
                </div>
                <div class="text-center">
                    <p class="text-2xl font-bold tracking-tight">
                        <span class="text-gray-800">+</span><span class="text-blue-600 font-extrabold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Flow</span>
                    </p>
                    <p class="text-xs text-gray-500 mt-1">Sistema de Flujo de Caja</p>
                </div>
            </div>
            <transition-group name="list" tag="ul" class="flex grow flex-col gap-2 py-2 overflow-y-auto scroll-custom">
                <li v-for="m in menu" :key="m.title" class="flex flex-col gap-1 px-2">
                    <h3 class="px-3 text-xs text-gray-500 font-semibold uppercase tracking-wider">{{ m.title }}</h3>
                    <template v-for="value in m.items">
                        <router-link
                            v-if="!value.children"
                            :to="{ name: value.routeName }"
                            class="flex items-center gap-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 px-3 py-2"
                            :class="isActiveRoute(value.routeName) ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-700'"
                        >
                            <i class="material-icons-round !text-sm">{{ value.icon }}</i>
                            <span class="text-sm">{{ value.name }}</span>
                        </router-link>
                        <div v-else>
                            <button
                                type="button"
                                @click="toggleMenu(value)"
                                class="w-full flex items-center gap-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors duration-300 px-3 py-2"
                                :class="isActiveMenu(value) ? 'text-blue-700 font-semibold' : 'text-gray-700'"
                            >
                                <i class="material-icons-round !text-sm">{{ value.icon }}</i>
                                <span class="text-sm">{{ value.name }}</span>
                                <i
                                    class="material-icons-round ml-auto transition-transform duration-300"
                                    :class="isMenuExpanded(value) ? 'rotate-180' : ''"
                                >
                                    expand_more
                                </i>
                            </button>
                            <transition name="submenu">
                                <ul
                                    v-show="isMenuExpanded(value)"
                                    class="flex flex-col gap-1 mt-1 border-l-2 border-gray-200 overflow-hidden"
                                    :class="isActiveMenu(value) ? 'border-l-blue-700': ''"
                                >
                                    <li v-for="child in value.children" :key="child.routeName || child.name" class="relative pl-6">
                                        <router-link
                                            :to="{ name: child.routeName }"
                                            class="flex items-center gap-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors duration-300 px-3 py-2"
                                            :class="isActiveRoute(child.routeName) ? 'activate bg-blue-100 text-blue-600 font-semibold' : 'text-gray-600'"
                                        >
                                            <i class="material-icons-round !text-sm">{{ child.icon }}</i>
                                            <span class="text-sm">{{ child.name }}</span>
                                        </router-link>
                                    </li>
                                </ul>
                            </transition>
                        </div>
                    </template>
                </li>
            </transition-group>
        </aside>
    </transition>
    <div class="fixed inset-0 bg-black/20 z-10" v-if="flagSidebar" @click="toggleSidebar">
    </div>
</template>
<script setup>
import { useSessionStore } from '@/stores/index.store'
import menu from './dataSidebar.js'

const sessionStore = useSessionStore()
const { flagSidebar } = storeToRefs(sessionStore)
const route = useRoute()
const expandedMenu = ref({})

// Verificar si la ruta está activa
function isActiveRoute(routeName) {
    return route.name === routeName
}

function isActiveMenu(item) {
    return item.children.some(child => isActiveRoute(child.routeName))
}

// Toggle del menú
function toggleMenu(item) {
    expandedMenu.value[item.parentName] = !expandedMenu.value[item.parentName]
    menu.forEach(section => {
        section.items.forEach(i => {
            if (i.parentName !== item.parentName && i.children) {
                expandedMenu.value[i.parentName] = false
            }
        })
    })
}

function isMenuExpanded(item) {
    return expandedMenu.value[item.parentName]
}

// Cargar el estado del menú al montar el componente
function loadMenuState() {
    menu.forEach(section => {
        section.items.forEach(item => {
            if (item.children) {
                expandedMenu.value[item.parentName] = isActiveMenu(item)
            }
        })
    })
}

const toggleSidebar = () => {
    sessionStore.setFlagSidebar();
}

onMounted(() => {
    loadMenuState()
}) 
</script>
<style scoped>
/* Animación usando clases de Vue Transition */
.submenu-enter-active {
    transition: transform 0.5s ease, opacity 0.25s ease;
}

.submenu-leave-active {
    transition: transform 0.25s cubic-bezier(1, 0, 0, 1), opacity 0.25s ease-in-out;
}

.submenu-enter-from,
.submenu-leave-to {
    transform: translateY(-5px);
    opacity: 0;
}

.submenu-enter-to,
.submenu-leave-from {
    transform: translateY(0);
    opacity: 1;
}

/* Animación para el sidebar */
.sidebar-fade-enter-active {
    transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
}

.sidebar-fade-leave-active {
    transition: all 0.3s cubic-bezier(0.47, 0, 0.745, 0.715);
}

.sidebar-fade-enter-from,
.sidebar-fade-leave-to {
    transform: translateX(-100%) ;
}

.sidebar-fade-enter-to,
.sidebar-fade-leave-from {
    transform: translateX(2px);
    animation-duration: 0.3s;
}

/* point blue in routelink selection */
.activate::before {
    content: '';
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    width: 8px;
    height: 8px;
    background-color: #2563eb; /* blue-600 */
    border-radius: 50%;
}

/* Animacion para las secciones */
.list-move,
.list-enter-active,
.list-leave-active {
    transition: transform 0.25s ease, opacity 0.25s ease, margin 0.25s ease, padding 0.25s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateY(8px);
}

.list-enter-to,
.list-leave-from {
    opacity: 1;
    transform: translateY(10px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
    position: relative;
    width: 100%;
}

/* Custom scrollbar styles */
.scroll-custom::-webkit-scrollbar {
    width: 8px;
}

.scroll-custom::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
}

.scroll-custom::-webkit-scrollbar-track {
    background-color: transparent;
}

.scroll-custom::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.4);
}
</style>