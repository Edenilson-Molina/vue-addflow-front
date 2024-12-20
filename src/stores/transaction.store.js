import { ref } from "vue";
import { defineStore } from "pinia";
import { 
    getTransactions, 
    createTransaction, 
    updateTransaction, 
    getTotalByDate,
    getTransactionsCategory
} from "@/services/transaction.services";
import { useToast } from "primevue/usetoast";

export const useTransactionStore = defineStore("transaction", () => {
    const dateTransaction = ref('');
    const expense = ref(0.00);
    const income = ref(0.00);
    const loadingTransaction = ref(false);
    const transactions = ref([]);
    // Notificaciones
    const toast = useToast();
    
    const fetchTransactions = async () => {
        loadingTransaction.value = true;
        const response = await getTransactions();
        if (response?.status === 200) {
            transactions.value = response?.data?.data;
            await totalByDate();
        }
        loadingTransaction.value = false;
    };

    const fetchTransactionsCategory = async (categoria_id, created_at) => {
        loadingTransaction.value = true;
        const response = await getTransactionsCategory(categoria_id, created_at);
        if (response?.status === 200) {
            transactions.value = response?.data?.data;
            await totalByDate();
        }
        loadingTransaction.value = false;
    }

    const saveTransaction = async (transaction) => {
        loadingTransaction.value = true;
        const response = await createTransaction(transaction);
        if (response?.status === 201) {
            transactions.value = [...transactions.value, response?.data?.data];
            await totalByDate();
            // Notificación
            toast.add({
                severity: 'success',
                summary: 'Operación registrada',
                detail: 'La operación se ha registrado correctamente',
                life: 3000
            });
        }
        loadingTransaction.value = false;
    }

    const editTransaction = async (id, transaction) => {
        loadingTransaction.value = true;
        const response = await updateTransaction(id, transaction);
        if (response?.status === 200) {
            transactions.value = transactions.value.map((item) => {
                if (item.id === id) {
                    return response?.data?.data;
                }
                return item;
            });
            await totalByDate();
            // Notificación
            toast.add({
                severity: 'success',
                summary: 'Operación actualizada',
                detail: 'La operación se ha actualizado correctamente',
                life: 3000
            });
        }
        loadingTransaction.value = false;
    }

    const totalByDate = async () => {
        const response = await getTotalByDate();
        if (response?.status === 200) {
            dateTransaction.value = response?.data?.date;
            income.value = response?.data?.total_ingresos;
            expense.value = response?.data?.total_egresos;
        }
    }
    
    return {
        dateTransaction,
        expense,
        income,
        loadingTransaction,
        transactions,
        editTransaction,
        fetchTransactions,
        saveTransaction,
        totalByDate,
        fetchTransactionsCategory
    };
});
