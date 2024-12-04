import { ref } from 'vue';
import { defineStore } from 'pinia';
import {
    getBanks
} from '@/services/bank.services';

export const useBankStore = defineStore('bank', () => {
    const banks = ref([]);
    const loading = ref(false);

    const fetchBanks = async () => {
        loading.value = true;
        const response = await getBanks();
        if (response?.status === 200) {
            banks.value = response?.data?.data;
        }
        loading.value = false;
    };

    return {
        banks,
        loading,
        fetchBanks,
    };
});