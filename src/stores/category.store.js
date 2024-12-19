import { ref } from 'vue';
import { defineStore } from 'pinia';
import {
    getCategories,
    createCategory,
    updateCategory
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

    const saveCategory = async (category) => {
      console.log(category);
      loadingCategories.value = true;
        const response = await createCategory(category);
        if (response?.status === 201) {
            categories.value = [...categories.value, response?.data?.data];
        }
        loadingCategories.value = false;
    }

    const editCategory = async (id, category) => {
        loadingCategories.value = true;
        const response = await updateCategory(id, category);
        if (response?.status === 200) {
            categories.value = categories.value.map((item) => {
                if (item.id === id) {
                    return response?.data?.data;
                }
                return item;
            });
        }
        loadingCategories.value = false;
    }

    return {
        categories,
        loadingCategories,
        fetchCategories,
        saveCategory,
        editCategory
    }
});
