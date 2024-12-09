import { ref } from "vue";
import { defineStore } from "pinia";
import { getTransactions, createTransaction, updateTransaction } from "@/services/transaction.services";

export const useTransactionStore = defineStore("transaction", () => {
    const transactions = ref([]);
    const loadingTransaction = ref(false);
    
    const fetchTransactions = async () => {
        loadingTransaction.value = true;
        const response = await getTransactions();
        if (response?.status === 200) {
            transactions.value = response?.data?.data;
        }
        loadingTransaction.value = false;
    };

    const saveTransaction = async (transaction) => {
        loadingTransaction.value = true;
        const response = await createTransaction(transaction);
        if (response?.status === 201) {
            transactions.value = [...transactions.value, response?.data?.data];
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
        }
        loadingTransaction.value = false;
    }
    
    return {
        loadingTransaction,
        transactions,
        fetchTransactions,
        saveTransaction,
        editTransaction,
    };
});
