<template>
    <section class="container mx-auto">
        <header class="flex flex-col sm:flex-row justify-between items-center">
            <article>
                <h1 class="text-3xl font-bold">Operaciones</h1>
                <p class="text-gray-500">LLeva un seguimiento y registra las operaciones del día</p>
            </article>
            <article class="flex gap-2">
                <TransactionPanel />
            </article>
        </header>
        <section class="flex flex-col gap-1 mt-2">
            <TransactionToolbar v-model:filterTransaction="filterTransaction" v-model:typeTransaction="typeTransaction"
                :optionsTypeTransaction="optionsTypeTransaction" @toggleNewTransaction="toggleNewTransaction" />
            <TransactionFormDialog v-model:visible="visible" v-model:form="form" :v$="v$" :btnEdit="btnEdit" :accounts="accounts"
                :loadingAccount="loadingAccount" :categoriesFilter="categoriesFilter" :loadingCategories="loadingCategories"
                @handleSaveTransaction="handleSaveTransaction" @handleEditTransaction="handleEditTransaction" />
            <TransactionDataView :transactionListFilter="transactionListFilter" :loadingTransaction="loadingTransaction"
                @showTransaction="showTransaction" />
        </section>
    </section>
</template>

<script setup>
import TransactionPanel from "./components/TransactionPanel.vue";
import TransactionFormDialog from "./components/TransactionFormDialog.vue";
import TransactionDataView from "./components/TransactionDataView.vue";
import TransactionToolbar from "./components/TransactionToolbar.vue";

import { onMounted, onUnmounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useAccountStore } from "@/stores/account.store";
import { useTransactionStore } from "@/stores/transaction.store";
import { useCategoryStore } from "@/stores/category.store";

import { useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";

const transactionStore = useTransactionStore();
const { fetchTransactions, saveTransaction, editTransaction } = transactionStore;
const { transactions, loadingTransaction } = storeToRefs(transactionStore);
const transactionListFilter = ref([]);

const accountStore = useAccountStore();
const { fetchAccounts } = accountStore;
const { accounts, loadingAccount } = storeToRefs(accountStore);

const categoryStore = useCategoryStore();
const { fetchCategories } = categoryStore;
const { categories, loadingCategories } = storeToRefs(categoryStore);
const categoriesFilter = ref([]);

const visible = ref(false);
const idTransaction = ref(null);
const btnEdit = ref(false);
const filterTransaction = ref('');
const typeTransaction = ref('Todos');
const optionsTypeTransaction = ref(['Todos', 'Ingresos', 'Egresos']);

// Form
const form = ref({
    cuenta_id: null,
    categoria_id: null,
    es_entrada: true,
    descripcion: '',
    monto: null,
    remitido_a: '',
    estado: true
});

// Validation
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

// Watchers
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
        return transaction.categoria.es_entrada === (value === 'Ingresos' ? true : false);
    });
});

watch(() => form.value.es_entrada, () => {
    categoriesFilter.value = categories.value.filter(categorie => categorie.es_entrada === form.value.es_entrada && categorie.estado === true);
});

// Functions
const toggleNewTransaction = () => {
    // Reset form
    visible.value = true;
    btnEdit.value = false;
    idTransaction.value = null;
    // Reset validation
    v$.value.$reset();
    // Reset form values
    form.value.cuenta_id = null;
    form.value.categoria_id = null;
    form.value.es_entrada = true;
    form.value.descripcion = '';
    form.value.monto = null;
    form.value.remitido_a = '';
    form.value.estado = true;
};

const handleSaveTransaction = async() => {
    v$.value.$touch();
    if (v$.value.$invalid) return;

    visible.value = false;
    await saveTransaction(form.value);
};

const showTransaction = (transaction) => {
    btnEdit.value = true;
    visible.value = true;
    idTransaction.value = transaction.id;
    form.value.cuenta_id = transaction.cuenta.id;
    form.value.es_entrada = transaction.categoria.es_entrada;
    form.value.categoria_id = transaction.categoria.id;
    form.value.descripcion = transaction.descripcion;
    form.value.monto = transaction.monto;
    form.value.remitido_a = transaction.remitido_a;
    form.value.estado = transaction.estado;
};

const handleEditTransaction = async () => {
    v$.value.$touch();
    if (v$.value.$invalid) return;
    visible.value = false;
    await editTransaction(idTransaction.value, form.value);
};

// Lifecycle
onMounted(async () => {
    await fetchTransactions();
    await fetchAccounts();
    await fetchCategories();
    categoriesFilter.value = categories.value.filter(categorie => categorie.es_entrada === form.value.es_entrada && categorie.estado === true);
    transactionListFilter.value = transactions.value;
});
</script>
