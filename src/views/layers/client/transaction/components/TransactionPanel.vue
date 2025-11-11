<template>
    <article class="animate-flip animate-once animate-duration-75 rounded-full">
        <div class="flex items-center gap-2">
            <i class="pi pi-thumbs-up text-green-500"></i>
            <span class="text-green-500 font-semibold text-lg">Ingresos</span>

        </div>
        <p class="m-0 text-center">
            <span class="text-green-500 text-lg">${{ income }}</span>
        </p>
    </article>
    <article class="animate-flip animate-once animate-duration-75 rounded-full">
        <div>
            <div class="flex items-center gap-2">
                <i class="pi pi-thumbs-down text-red-500"></i>
                <span class="text-red-500 font-semibold text-lg">Egresos</span>
            </div>
        </div>
        <p class="m-0 text-center">
            <span class="text-red-500 text-lg">${{ expense }}</span>
        </p>
    </article>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useTransactionStore } from "@/stores/transaction.store";
import { onMounted } from "vue";
const transactionStore = useTransactionStore();
const { income, expense } = storeToRefs(transactionStore);

onMounted(async () => {
    await transactionStore.totalByDate();
})
</script>
