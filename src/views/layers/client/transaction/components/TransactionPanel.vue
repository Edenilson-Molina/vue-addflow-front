<template>
    <Fieldset class="shadow animate-flip animate-once animate-duration-75" >
        <template #legend>
            <div class="flex items-center gap-2">
                <i class="pi pi-arrow-up text-green-500"></i>
                <span class="text-green-500 font-semibold text-lg">Ingresos</span>
            </div>
        </template>
        <p class="m-0 text-center">
            <span class="text-green-500 font-semibold text-lg">${{ income }}</span>
        </p>
    </Fieldset>
    <Fieldset class="shadow animate-flip animate-once animate-duration-75">
        <template #legend>
            <div class="flex items-center gap-2">
                <i class="pi pi-arrow-down text-red-500"></i>
                <span class="text-red-500 font-semibold text-lg">Egresos</span>
            </div>
        </template>
        <p class="m-0 text-center">
            <span class="text-red-500 font-semibold text-lg">${{ expense }}</span>
        </p>
    </Fieldset>
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