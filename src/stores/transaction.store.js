import { ref } from "vue";
import { defineStore } from "pinia";
import { getTransactions } from "@/services/transaction.services";

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
    
    return {
        loadingTransaction,
        transactions,
        fetchTransactions,
    };
});
