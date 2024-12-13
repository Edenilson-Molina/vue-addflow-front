import { ref } from 'vue';
import { defineStore } from 'pinia';
import {
    getBanks
} from '@/services/bank.services';

export const useBankStore = defineStore('bank', () => {
    const banks = ref([]);
    const loadingBanks = ref(false);

    const fetchBanks = async () => {
        loadingBanks.value = true;
        const response = await getBanks();
        if (response?.status === 200) {
            banks.value = response?.data?.data;
        }
        loadingBanks.value = false;
    };

    return {
        banks,
        loadingBanks,
        fetchBanks,
    };
});
