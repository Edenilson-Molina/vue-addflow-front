import { ref } from 'vue';
import { defineStore } from 'pinia';
import {
    getAccounts
} from '@/services/account.services';

export const useAccountStore = defineStore('account', () => {
    const accounts = ref([]);
    const loadingAccount = ref(false);

    const fetchAccounts = async () => {
        loadingAccount.value = true;
        const response = await getAccounts();
        if (response?.status === 200) {
            accounts.value = response?.data?.data;
        }
        loadingAccount.value = false;
    };

    return {
        loadingAccount,
        accounts,
        fetchAccounts
    };
});