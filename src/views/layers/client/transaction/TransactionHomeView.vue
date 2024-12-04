<template>
    <section class="container mx-auto">
        <header>
            <h1 class="text-3xl font-bold">Operaciones</h1>
            <p class="text-gray-500">LLeva un seguimiento y registra las operaciones del día</p>
        </header>
        <section class="flex flex-col gap-1 mt-2">
            <Toolbar class="mb-6">
                <template #start>
                    <Button label="Nuevo" icon="pi pi-plus" class="mr-2" @click="visible = true" />
                </template>
                <template #center>
                    <div class="flex justify-start">
                        <IconField class="w-full">
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText class="w-full" v-model="filterTransaction" placeholder="Búsqueda" />
                        </IconField>
                    </div>
                </template>
                <template #end>
                    <div class="card flex justify-center">
                        <SelectButton v-model="typeTransaction" :options="optionsTypeTransaction" />
                    </div>
                </template>
            </Toolbar>
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
                            <div class="flex flex-col sm:flex-row sm:items-center p-2 gap-4"
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
                                            :class="{'text-red-500': !item.categoria.es_entrada}">${{ item.monto
                                            }}</span>
                                        <div class="flex gap-2 items-center">
                                            <Chip :label="item.remitido_a" />
                                            <div>
                                                <div class="bg-surface-100 p-1" style="border-radius: 30px">
                                                    <div class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2"
                                                        style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                                                        <span class="text-surface-900 font-medium text-sm">{{
                                                            getTransactionStatus(item.estado) }}</span>
                                                        <i
                                                            :class="{ 'pi pi-star-fill text-yellow-500': item.estado == 1 }"></i>
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
            <Dialog v-model:visible="visible" modal :style="{ width: '30rem' }">
                <template #header>
                    <div class="inline-flex items-center justify-between gap-2 w-full">
                        <div class="flex items-center gap-2">
                            <i class="pi pi-wallet"></i>
                            <span class="font-bold whitespace-nowrap">Registrar operación</span>
                        </div>
                        <div class="flex flex-col items-center">
                            <ToggleButton v-model="form.estado" class="w-40" onLabel="Aprobada" offLabel="Pendiente" onIcon="pi pi-check" offIcon="pi pi-times" />
                        </div>
                    </div>
                </template>
                <span class="text-surface-500 dark:text-surface-400 block mb-4">Información general</span>
                <div class="flex items-center gap-2 mb-4">
                    <label for="username" class="font-semibold w-24">Remitido a</label>
                    <InputTextComponent class="flex-auto" autocomplete="off"
                        :placeholder="'Institución o negocio remitente'" />
                </div>
                <div class="flex items-center gap-2 mb-2">
                    <label class="font-semibold w-24">Descripción</label>
                    <TextareaComponent class="flex-auto" autocomplete="off"
                        :placeholder="'Breve descripción de la operación a realizar'" />
                </div>
                <span class="text-surface-500 dark:text-surface-400 block mb-4">Detalles financieros</span>
                <div class="flex flex-row gap-2">
                    <div class="flex flex-col gap-1 mb-2 w-48">
                        <label class="font-semibold w-full text-center">Monto</label>
                        <InputNumberComponent class="flex-auto" autocomplete="off"
                            :placeholder="'$##.##'" />
                    </div>
                    <div class="flex flex-col gap-1 mb-2 w-full">
                        <label class="font-semibold w-full text-center">Cuenta</label>
                        <Select :options="accounts" class="flex-auto" autocomplete="off" :placeholder="'Cuenta asociada'" /> 
                    </div>
                </div>
                <span class="text-surface-500 dark:text-surface-400 block mb-4">Categoría</span>
                <div class="flex flex-row gap-2">
                    <div class="flex flex-col gap-1 mb-2 w-48">
                        <label class="font-semibold w-full text-center">Tipo</label>
                        <Select autocomplete="off"
                            :placeholder="'Tipo'" />
                    </div>
                    <div class="flex flex-col gap-1 mb-2 w-full">
                        <label class="font-semibold w-full text-center">Categoría</label>
                        <Select :filter="true" :options="categories" class="flex-auto" autocomplete="off" :placeholder="'Categoría de la operación'" /> 
                    </div>
                </div>
                <template #footer>
                    <Button label="Cancel" text severity="secondary" @click="visible = false" autofocus />
                    <Button label="Save" outlined severity="secondary" @click="visible = false" autofocus />
                </template>
            </Dialog>
        </section>
    </section>
</template>

<script setup>
import { onMounted, ref, reactive, watch } from "vue";
import { useAccountStore } from "@/stores/account.store";
import { useTransactionStore } from "@/stores/transaction.store";
import { useCategoryStore } from "@/stores/category.store";
import { storeToRefs } from "pinia";
import Select from "@/components/forms/SelectComponent.vue";
import InputTextComponent from "@/components/forms/InputTextComponent.vue";
import TextareaComponent from "@/components/forms/TextareaComponent.vue";
import InputNumberComponent from "@/components/forms/InputNumberComponent.vue";

const transactionStore = useTransactionStore();
const { fetchTransactions } = transactionStore;
const { transactions } = storeToRefs(transactionStore);

const accountStore = useAccountStore();
const { fetchAccounts } = accountStore;
const { accounts } = storeToRefs(accountStore);

const categoryStore = useCategoryStore();
const { fetchCategories } = categoryStore;
const { categories } = storeToRefs(categoryStore);

const visible = ref(false);
const filterTransaction = ref('');
const transactionListFilter = ref([]);
const typeTransaction = ref('Todos');
const optionsTypeTransaction = ref(['Todos', 'Ingresos', 'Egresos']);

onMounted(async () => {
    await fetchTransactions();
    await fetchAccounts();
    await fetchCategories();
    transactionListFilter.value = transactions.value;
});

const form = reactive({
    cuenta: null,
    categoria: null,
    descripcion: '',
    monto: null,
    remitido_a: '',
    estado: false
});

const getTransactionStatus = (status) => {
    switch (status) {
        case 1:
            return 'Aprobada';
        default:
            return 'Pendiente';
    }
};

const getTransactionDate = (date) => {
    return new Date(date).toLocaleTimeString();
};

watch(filterTransaction, (value) => {
    transactionListFilter.value = transactions.value.filter((transaction) => {
        return transaction.categoria.nombre.toLowerCase().includes(value.toLowerCase()) ||
            transaction.descripcion.toLowerCase().includes(value.toLowerCase()) ||
            transaction.remitido_a.toLowerCase().includes(value.toLowerCase());
    });
});

watch(typeTransaction, (value) => {
    transactionListFilter.value = transactions.value.filter((transaction) => {
        if (value === 'Todos') return true;
        return transaction.categoria.es_entrada === (value === 'Ingresos' ? 1 : 0);
    });
});

</script>