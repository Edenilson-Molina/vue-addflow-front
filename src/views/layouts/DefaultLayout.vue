<template>
    <header class="fixed top-0 left-0 p-4 w-full z-10">
        <Menubar :model="items">
            <template #start>
                <img class="w-8 mr-1" src="/src/assets/logo.svg" alt="Logo de Flujo de Caja">
                <h1>Flujo de caja</h1>
            </template>
            <template #item="{ item, props, hasSubmenu, root }">
                <router-link v-if="item.name" v-slot="{ isActive }" :to="{ name: item.name }">
                    <a v-ripple class="flex items-center" v-bind="props.action">
                        <div class="flex items-center gap-1" :class="{ 'text-blue-400': isActive }">
                            <span :class="item.icon" />
                            <span>{{ item.label }}</span>
                        </div>
                        <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
                        <span v-if="item.shortcut"
                            class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">
                            {{ item.shortcut }}
                        </span>
                        <i v-if="hasSubmenu"
                            :class="['pi pi-angle-down ml-auto', { 'pi-angle-down': root, 'pi-angle-right': !root }]">
                        </i>
                    </a>
                </router-link>
                <a v-else v-ripple v-bind="props.action">
                    <span :class="item.icon" />
                    <span>{{ item.label }}</span>
                    <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
                </a>
            </template>
            <template #end>
                <div class="flex items-center gap-2">
                    <Avatar image="/avatar.png" shape="circle" />
                </div>
            </template>
        </Menubar>
    </header>
    <main class="flex flex-1 px-16 pt-20 overflow-y-auto">
        <router-view />
    </main>
    <footer class="text-white p-4 w-full">
        <div class="container mx-auto text-center">
            © 2024 Flujo de Caja. Todos los derechos reservados.
        </div>
    </footer>
</template>

<script setup>

import { ref } from "vue";

const items = ref([
    {
        label: 'Dashboard',
        name: 'dashboard',
        icon: 'pi pi-home',
    },
    {
        label: 'Operaciones del día',
        name: 'transactions',
        icon: 'pi pi-money-bill',
    },
    {
        label:'Mantenimientos',
        icon: 'pi pi-spin pi-cog',
        items: [
            {
                label: 'Cuentas',
                name: 'accounts',
                icon: 'pi pi-briefcase',
            },
            {
                label: 'Categorías',
                name: 'categories',
                icon: 'pi pi-tags',
            },
        ]
    },
]);
</script>
