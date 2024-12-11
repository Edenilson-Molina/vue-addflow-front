<template>
    <DataView class="w-full" :value="transactionListFilter" paginator :rows="4">
        <template #empty>
            <div class="flex flex-col items-center justify-center gap-1">
                <i class="pi pi-money-bill text-6xl text-surface-300 dark:text-surface-700"></i>
                <p class="text-surface-500 dark:text-surface-400">No hay transacciones registradas</p>
            </div>
        </template>
        <template #list="slotProps">
            <div class="flex flex-col">
                <div v-for="(item, index) in slotProps.items" :key="index">
                    <div @click="showTransaction(item)"
                        class="flex flex-col sm:flex-row sm:items-center p-2 gap-4 hover:bg-slate-100 dark:hover:bg-surface-800 cursor-pointer"
                        :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }">
                        <div class="flex flex-col items-center md:w-40">
                            <div class="rounded-border" style="left: 4px; top: 4px">
                                <Tag :value="item.cuenta.nombre" :severity="'contrast'"></Tag>
                            </div>
                            <p>{{ getTransactionDate(item.created_at) }}</p>
                        </div>
                        <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                            <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                                <div>
                                    <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{
                                        item.categoria.nombre }}</span>
                                    <div class="text-lg font-medium mt-2">{{ item.descripcion }}</div>
                                </div>
                            </div>
                            <div class="flex flex-col md:items-end gap-1">
                                <span class="text-xl font-semibold"
                                    :class="{ 'text-red-500': !item.categoria.es_entrada, 'text-green-500': item.categoria.es_entrada }">
                                    ${{ item.monto }}
                                </span>
                                <div class="flex gap-2 items-center">
                                    <Chip :label="item.remitido_a" />
                                    <div>
                                        <div class="bg-surface-100 p-1" style="border-radius: 30px">
                                            <div class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2"
                                                style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                                                <span class="text-surface-900 font-medium text-sm">{{
                                                    getTransactionStatus(item.estado) }}</span>
                                                <i :class="{ 'pi pi-star-fill text-yellow-500': item.estado == 1 }"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </DataView>
</template>

<script setup>

const getTransactionDate = (date) => {
    return new Date(date).toLocaleTimeString();
};

const getTransactionStatus = (status) => {
    return status ? 'Aprobada' : 'Pendiente';
};

const props = defineProps({
    transactionListFilter: {
        type: Array,
        required: true,
    },
});

const emit = defineEmits(['showTransaction']);

const showTransaction = (transaction) => {
    emit('showTransaction', transaction);
};


</script>