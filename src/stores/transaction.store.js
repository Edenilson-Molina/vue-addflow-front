import { ref } from "vue";
import { defineStore } from "pinia";
import { getTransactions, createTransaction, updateTransaction, getTotalByDate } from "@/services/transaction.services";

export const useTransactionStore = defineStore("transaction", () => {
    const dateTransaction = ref('');
    const income = ref(0.00);
    const expense = ref(0.00);
    const transactions = ref([]);
    const loadingTransaction = ref(false);
    
    const fetchTransactions = async () => {
        loadingTransaction.value = true;
        const response = await getTransactions();
        if (response?.status === 200) {
            transactions.value = response?.data?.data;
            await totalByDate();
        }
        loadingTransaction.value = false;
    };

    const saveTransaction = async (transaction) => {
        loadingTransaction.value = true;
        const response = await createTransaction(transaction);
        if (response?.status === 201) {
            transactions.value = [...transactions.value, response?.data?.data];
            await totalByDate();
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
        loadingTransaction,
        transactions,
        dateTransaction,
        income,
        expense,
        fetchTransactions,
        saveTransaction,
        editTransaction,
        totalByDate,
    };
});
