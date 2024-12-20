<template>
    <header class="fixed top-0 left-0 p-4 w-full z-10">
        <Menubar :model="items">
            <template #start>
                <router-link to="/">
                    <div class="flex gap-1 items-center">
                        <img class="w-8 mr-1" src="/src/assets/logo.svg" alt="Logo de Flujo de Caja">
                        <h1>Flujo de caja</h1>
                    </div>
                </router-link>
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
                    <span class="font-semibold">¡Hola!, {{ user?.name }}</span>
                    <div class="card flex justify-center cursor-pointer">
                        <Avatar image="/avatar.png" shape="circle" @click="toggle" aria-haspopup="true"
                            aria-controls="overlay_menu" />
                        <Menu ref="menu" id="overlay_menu" :model="itemsMenu" :popup="true">
                            <template #end>
                                <button v-ripple
                                    class="relative overflow-hidden w-full border-0 bg-transparent flex items-start p-2 pl-4 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-none cursor-pointer transition-colors duration-200">
                                    <Avatar image="/avatar.png" class="mr-2" shape="circle" />
                                    <span class="inline-flex flex-col items-start">
                                        <span class="font-bold">{{ user?.name }}</span>
                                        <span class="text-sm">{{ user?.email }}</span>
                                    </span>
                                </button>
                            </template>
                        </Menu>
                        <Dialog v-model:visible="visible" modal header="Saldo Inicial Histórico" :style="{ width: '25rem' }">
                            <span class="text-surface-500 dark:text-surface-400 block mb-8">
                                Puede actualizar el saldo inicial histórico del sistema
                            </span>
                            <div class="flex items-center gap-4 mb-4">
                                <label class="font-semibold w-24">Monto</label>
                                <InputNumber v-model="saldoHistorico" :errors="$v.saldoHistorico.$errors" class="flex-auto" autocomplete="off" />
                            </div>
                            <div class="flex justify-end gap-2">
                                <Button type="button" label="Cancel" text severity="secondary"
                                    @click="visible = false"></Button>
                                <Button type="button" severity="contrast" label="Guardar Cambios" @click="editSaldoHistorico"></Button>
                            </div>
                        </Dialog>
                    </div>
                </div>
            </template>
        </Menubar>
    </header>
    <main class="grow flex px-16 pt-24">
        <router-view />
        <Toast position="top-center" />
    </main>
    <footer class="text-white p-4 w-full">
        <div class="container mx-auto text-center">
            © 2024 Flujo de Caja. Todos los derechos reservados.
        </div>
    </footer>
</template>

<script setup>
import InputNumber from "@/components/forms/InputNumberComponent.vue";

import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

import useVuelidate from "@vuelidate/core";
import { required, helpers } from '@vuelidate/validators'

import { useAuthStore } from "@/stores/auth.store";
import { useFlujoCajaStore } from "@/stores/flujo-caja.store";

const $router = useRouter();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const FlujoCajaStore = useFlujoCajaStore();
const { saldoHistorico } = storeToRefs(FlujoCajaStore);

const visible = ref(false);
const rules = {
    saldoHistorico: {
        required: helpers.withMessage('El saldo histórico es requerido', required),
    },
};
const $v = useVuelidate(rules, { saldoHistorico });

const menu = ref();
const itemsMenu = ref([
    {
        label: 'Configuración',
        items: [
            {
                label: 'Saldo Historico',
                command: () => {
                    visible.value = true;
                    menu.value.hide();
                },
                icon: 'pi pi-pen-to-square',
            },
        ]
    },
    {
        label: 'Perfil',
        items: [
            {
                label: 'Cerrar sesión',
                command: async () => {
                    await authStore.logout();
                    $router.push({ name: 'login' });
                },
                icon: 'pi pi-sign-out',
            },
        ]
    },
    {
        separator: true
    }
]);
const toggle = (event) => menu.value.toggle(event);

const items = ref([
    {
        label: 'Operaciones diarias',
        name: 'transactions',
        icon: 'pi pi-money-bill',
    },
    {
        label: 'Reportes',
        icon: 'pi pi-chart-bar',
        items: [
            {
                label: 'Flujo de caja diario',
                name: 'flujo-caja-diario',
                icon: 'pi pi-file',
            },
        ]
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

const editSaldoHistorico = async() => {
    $v.value.$touch();
    if ($v.value.$invalid) return;
    await FlujoCajaStore.updateSaldoHistorico();
    visible.value = false;
};

onMounted(async () => {
    await FlujoCajaStore.fetchSaldoHistorico();
});
</script>
