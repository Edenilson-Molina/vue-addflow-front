import { ref } from 'vue';
import { defineStore } from 'pinia';
import {
    getCategories
} from '@/services/category.services';

export const useCategoryStore = defineStore('category', () => {
    const categories = ref([]);
    const loadingCategories = ref(false);

    const fetchCategories = async () => {
        loadingCategories.value = true;
        const response = await getCategories();
        if (response?.status === 200) {
            categories.value = response?.data?.data;
        }
        loadingCategories.value = false;
    }

    return {
        categories,
        loadingCategories,
        fetchCategories
    }
});