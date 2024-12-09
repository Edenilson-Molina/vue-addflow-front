<template>
    <section class="container mx-auto">
        <header>
            <h1 class="text-3xl font-bold">Dashboard</h1>
            <p class="text-gray-500">Bienvenido a la página de inicio</p>
        </header>
        <section class="flex gap-4">
            <article class="animate-zoomin animate-once animate-duration-1000 cursor-pointer">
                <Card style="width: 25rem; overflow: hidden">
                    <template #title>
                        <div :class="'flex gap-2 items-center'">
                            <i class="pi pi-list"></i>
                            <h2>Transacciones diarias</h2>
                        </div>
                    </template>
                    <template #subtitle>Registro operativo</template>
                    <template #content>
                        <p class="m-0">
                            Sección de operaciones diarias para el registro de movimientos de caja.
                        </p>
                    </template>
                </Card>
            </article>
        </section>
    </section>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth.store";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
</script>