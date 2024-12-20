import { ref } from 'vue';
import { defineStore } from 'pinia';
import {
    getAccounts,
    getTypesAccounts,
    createAccount,
    updateAccount
} from '@/services/account.services';

export const useAccountStore = defineStore('account', () => {
    const accounts = ref([]);
    const typeAccounts = ref([]);
    const loadingAccount = ref(false);

    const fetchAccounts = async () => {
        if(loadingAccount.value) return;
        loadingAccount.value = true;
        const response = await getAccounts();
        if (response?.status === 200) {
            accounts.value = response?.data?.data;
        }
        loadingAccount.value = false;
    };

    const fetchTypeAccounts = async (type) => {
        const response = await getTypesAccounts(type);
        if (response?.status === 200) {
            typeAccounts.value = response?.data?.data;
        }
    }

    const saveAccount = async (account) => {
        const response = await createAccount(account);
        if (response?.status === 201) {
            accounts.value = [...accounts.value, response?.data?.data];
        }
    }

    const editAccount = async (id, account) => {
        const response = await updateAccount(id, account);
        if (response?.status === 200) {
            accounts.value = accounts.value.map((item) => {
                if (item.id === id) {
                    return response?.data?.data;
                }
                return item;
            });
        }
    }

    return {
        loadingAccount,
        accounts,
        typeAccounts,
        fetchAccounts,
        fetchTypeAccounts,
        saveAccount,
        editAccount
    };
});
