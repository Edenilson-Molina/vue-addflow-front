<template>
    <section class="container mx-auto">
        <header>
            <h1 class="text-3xl font-bold">Operaciones</h1>
            <p class="text-gray-500">LLeva un seguimiento y registra las operaciones del día</p>
        </header>
        <section class="flex flex-col gap-1 mt-2">
            <Toolbar class="mb-6">
                <template #start>
                    <Button label="Nuevo" icon="pi pi-plus" class="mr-2" @click="toggleNewTransaction" />
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
                        <div v-for="(item, index) in slotProps.items" :key="index" >
                            <div @click="showTransaction(item)" class="flex flex-col sm:flex-row sm:items-center p-2 gap-4 hover:bg-slate-100 dark:hover:bg-surface-800 cursor-pointer"
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
                                            <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ item.categoria.nombre }}</span>
                                            <div class="text-lg font-medium mt-2">{{ item.descripcion }}</div>
                                        </div>
                                    </div>
                                    <div class="flex flex-col md:items-end gap-1">
                                        <span class="text-xl font-semibold"
                                            :class="{ 'text-red-500': !item.categoria.es_entrada }">
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
                    <div class="inline-flex items-center justify-between gap-2 w-full mr-2">
                        <div class="flex items-center gap-2">
                            <i class="pi pi-wallet"></i>
                            <span class="font-bold whitespace-nowrap">Registrar operación</span>
                        </div>
                        <div class="flex flex-col items-center">
                            <ToggleButton v-model="form.estado" class="w-32 text-sm" onLabel="Aprobada"
                                offLabel="Pendiente" onIcon="pi pi-check" offIcon="pi pi-times" />
                        </div>
                    </div>
                </template>
                <div class="flex justify-between items-center mb-4">
                    <span class="text-surface-500 dark:text-surface-400">Información general</span>
                    <div class="flex items-center gap-1">
                        <span class="text-surface-500 dark:text-surface-400">{{ form.es_entrada ? 'Ingreso' :
                            'Egreso'}}</span>
                        <ToggleSwitch v-model="form.es_entrada">
                            <template #handle="{ checked }">
                                <i :class="['!text-xs pi', { 'pi-check': checked }]" />
                            </template>
                        </ToggleSwitch>
                    </div>
                </div>
                <div class="flex items-center gap-2 mb-4">
                    <label for="username" class="font-semibold w-24">Remitido a</label>
                    <InputTextComponent v-model="form.remitido_a" class="flex-auto" autocomplete="off"
                        :placeholder="'Institución o negocio remitente'" :errors="v$.remitido_a.$errors" />
                </div>
                <div class="flex items-center gap-2 mb-2">
                    <label class="font-semibold w-24">Descripción</label>
                    <TextareaComponent v-model="form.descripcion" class="flex-auto" autocomplete="off"
                        :placeholder="'Breve descripción de la operación a realizar'"
                        :errors="v$.descripcion.$errors" />
                </div>
                <span class="text-surface-500 dark:text-surface-400 block mb-4">Detalles financieros</span>
                <div class="flex flex-row gap-2">
                    <div class="flex flex-col gap-1 mb-2 w-48">
                        <label class="font-semibold w-full text-center">Monto</label>
                        <InputNumberComponent v-model="form.monto" class="flex-auto" autocomplete="off"
                            :placeholder="'$##.##'" :errors="v$.monto.$errors" />
                    </div>
                    <div class="flex flex-col gap-1 mb-2 w-full">
                        <label class="font-semibold w-full text-center">Cuenta</label>
                        <Select v-model="form.cuenta_id" :options="accounts" class="flex-auto" autocomplete="off"
                            :placeholder="'Cuenta asociada'" :errors="v$.cuenta_id.$errors" />
                    </div>
                </div>
                <span class="text-surface-500 dark:text-surface-400 block mb-2">Categoría</span>
                <div class="flex flex-row gap-2">
                    <div class="flex flex-col gap-1 w-full">
                        <label class="font-semibold w-full text-center">Categoría</label>
                        <Select v-model="form.categoria_id" :filter="true" :options="categoriesFilter" class="flex-auto"
                            autocomplete="off" :placeholder="'Categoría de la operación'"
                            :errors="v$.categoria_id.$errors" />
                    </div>
                </div>
                <template #footer>
                    <Button label="Cancelar" text severity="secondary" @click="visible = false" />
                    <Button v-if="btnEdit" label="Guardar Cambios" severity="contrast" @click="handleEditTransaction" />
                    <Button v-else label="Registrar" severity="success" @click="handleSaveTransaction" />
                </template>
            </Dialog>
        </section>
    </section>
</template>

<script setup>
import Select from "@/components/forms/SelectComponent.vue";
import InputTextComponent from "@/components/forms/InputTextComponent.vue";
import TextareaComponent from "@/components/forms/TextareaComponent.vue";
import InputNumberComponent from "@/components/forms/InputNumberComponent.vue";

import { onMounted, ref, reactive, watch, useTemplateRef, watchEffect } from "vue";
import { useAccountStore } from "@/stores/account.store";
import { useTransactionStore } from "@/stores/transaction.store";
import { useCategoryStore } from "@/stores/category.store";
import { storeToRefs } from "pinia";

import { useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";

const transactionStore = useTransactionStore();
const { fetchTransactions, saveTransaction, editTransaction } = transactionStore;
const { transactions } = storeToRefs(transactionStore);

const accountStore = useAccountStore();
const { fetchAccounts } = accountStore;
const { accounts } = storeToRefs(accountStore);

const categoryStore = useCategoryStore();
const { fetchCategories } = categoryStore;
const { categories } = storeToRefs(categoryStore);
const categoriesFilter = ref([]);

const visible = ref(false);
const idTransaction = ref(null);
const btnEdit = ref(false);
const filterTransaction = ref('');
const transactionListFilter = ref([]);
const typeTransaction = ref('Todos');
const optionsTypeTransaction = ref(['Todos', 'Ingresos', 'Egresos']);

onMounted(async () => {
    await fetchTransactions();
    await fetchAccounts();
    await fetchCategories();
    transactionListFilter.value = transactions.value;
    categoriesFilter.value = categories.value.filter(categories => categories.es_entrada === 1);
});

const form = reactive({
    cuenta_id: null,
    categoria_id: null,
    es_entrada: true,
    descripcion: '',
    monto: null,
    remitido_a: '',
    estado: false
});

const rule = {
    cuenta_id: {
        required: helpers.withMessage('Asocie una cuenta', required)
    },
    categoria_id: {
        required: helpers.withMessage('Seleccione la categoría de operación', required)
    },
    descripcion: {
        required: helpers.withMessage('Coloque una descripción', required)
    },
    monto: {
        required: helpers.withMessage('Monto de la operación', required)
    },
    remitido_a: {
        required: helpers.withMessage('Debe ingresar el remitente', required)
    }
};

const v$ = useVuelidate(rule, form);

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

watch(transactions, (value) => {
    transactionListFilter.value = value.filter((transaction) => {
        if (typeTransaction.value === 'Todos') return true;
        return transaction.categoria.es_entrada === (typeTransaction.value === 'Ingresos' ? 1 : 0);
    });
});

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

watch(() => form.es_entrada, (newValue) => {
    form.categoria_id = null;
    if (newValue) 
        categoriesFilter.value = categories.value.filter(categories => categories.es_entrada === 1);
    else
        categoriesFilter.value = categories.value.filter(categories => categories.es_entrada === 0);
});

const toggleNewTransaction = () => {
    visible.value = true;
    btnEdit.value = false;
    idTransaction.value = null;
    v$.value.$reset();
    form.cuenta_id = null;
    form.categoria_id = null;
    form.es_entrada = true;
    form.descripcion = '';
    form.monto = null;
    form.remitido_a = '';
    form.estado = false;
};

const handleSaveTransaction = async() => {
    v$.value.$touch();
    if (v$.value.$invalid) return;
    visible.value = false;
    await saveTransaction(form);
};

const showTransaction = async (transaction) => {
    btnEdit.value = true;
    visible.value = true;
    idTransaction.value = transaction.id;
    form.cuenta_id = transaction.cuenta.id;
    form.es_entrada = (transaction.categoria.es_entrada == 1)? true : false;
    form.categoria_id = await transaction.categoria.id;
    form.descripcion = transaction.descripcion;
    form.monto = transaction.monto;
    form.remitido_a = transaction.remitido_a;
    form.estado = (transaction.estado == 1)? true : false;
};

const handleEditTransaction = async () => {
    v$.value.$touch();
    if (v$.value.$invalid) return;
    visible.value = false;
    await editTransaction(idTransaction.value, form);
};

</script>
