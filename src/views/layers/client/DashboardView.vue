<template>
    <section class="container mx-auto">
        <header>
            <h1 class="text-3xl font-bold">Dashboard</h1>
            <p class="text-gray-500">Bienvenido a la página de inicio</p>
        </header>
        <section class="mt-4">
            <DashboardPanel />
        </section>
        <section class="flex gap-4">
            <RouterLink :to="{name:'transactions'}">
                <article class="animate-zoomin animate-once animate-duration-1000 cursor-pointer">
                    <Card style="width: 25rem; overflow: hidden">
                        <template #title>
                            <div :class="'flex gap-2 items-center'">
                                <i class="pi pi-list"></i>
                                <h2>Operaciones del dia</h2>
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
            </RouterLink>
        </section>
    </section>
</template>

<script setup>
import DashboardPanel from "./components/DashboardPanel.vue";

const date = Date.now();

</script>