<template>
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Panel class="rounded-lg shadow">
            <template #header>
                <div class="flex gap-2 items-center">
                    <i class="pi pi-money-bill"></i>
                    <h2>Saldo Inicial</h2>
                </div>
            </template>
            <article class="flex justify-between items-center">
                <div class="bg-blue-400 dark:bg-blue-800 rounded-full p-3">
                    <img src="/src/assets/money.svg" alt="">
                </div>
                <div>
                    <p class="text-gray-500 dark:text-gray-400 text-sm font-medium">
                      {{ new Date(date).toLocaleDateString() }}
                    </p>
                    <p class="text-2xl font-bold text-gray-800 dark:text-gray-200">$Pendiente</p>
                </div>
            </article>
        </Panel>
        <Panel class="rounded-lg shadow">
            <template #header>
                <div class="flex gap-2 items-center">
                    <i class="pi pi-chart-line"></i>
                    <h2>Resumen de Ingresos</h2>
                </div>
            </template>
            <article class="flex justify-between items-center">
                <div class="bg-green-400 dark:bg-green-800 rounded-full p-3">
                    <img src="/src/assets/money.svg" alt="">
                </div>
                <div>
                    <p class="text-gray-500 dark:text-gray-400 text-sm font-medium">Ingresos ({{ today }})</p>
                    <p class="text-2xl font-bold text-gray-800 dark:text-gray-200">${{ income }}</p>
                </div>
            </article>
        </Panel>
        <Panel class="rounded-lg shadow">
            <template #header>
                <div class="flex gap-2 items-center">
                    <i class="pi pi-chart-line"></i>
                    <h2>Resumen de Egresos</h2>
                </div>
            </template>
            <div class="flex justify-between items-center">
                <div class="bg-red-400 dark:bg-red-800 rounded-full p-3">
                    <img src="/src/assets/money.svg" alt="">
                </div>
                <div>
                    <p class="text-gray-500 dark:text-gray-400 text-sm font-medium">Egresos ({{ today }})</p>
                    <p class="text-2xl font-bold text-gray-800 dark:text-gray-200">${{ expense }}</p>
                </div>
            </div>
        </Panel>
    </section>
</template>

<script setup>
import { onMounted } from "vue";
import { useTransactionStore } from "@/stores/transaction.store";
import { storeToRefs } from "pinia";

const transactionStore = useTransactionStore();
const { income, expense } = storeToRefs(transactionStore);
const date = Date.now();
const today = new Intl.DateTimeFormat("es", { weekday: "long" }).format(date);

onMounted(async () => {
    await transactionStore.totalByDate();
});
</script>
