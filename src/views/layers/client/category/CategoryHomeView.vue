<template>
    <section class="container mx-auto">
        <header>
            <h1 class="text-3xl font-bold">Categorias</h1>
            <p class="text-gray-500">Visualiza las categorias disponibles</p>
        </header>
        <section class="flex">
            <Tabs value="0" class="flex-1">
                <TabList>
                    <Tab value="0" class="flex justify-center items-center gap-2">
                        <i class="pi pi-plus"></i>
                        <span>Ingresos</span>
                    </Tab>
                    <Tab value="1" class="flex justify-center items-center gap-2">
                        <i class="pi pi-minus"></i>
                        <span>Egresos</span>
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel value="0">
                        
                        <div class="card">
                            <DataTable v-model:filters="filters" 
                                :value="categoriesIngresos" tableStyle="min-width: 50rem" selectionMode="single" :loading="loadingCategories">
                                <template #header>
                                    <div class="flex justify-start">
                                        <IconField class="w-full">
                                            <InputIcon>
                                                <i class="pi pi-search" />
                                            </InputIcon>
                                            <InputText class="w-full" v-model="filters['nombre'].value" placeholder="Búsqueda de categoría" />
                                        </IconField>
                                    </div>
                                </template>
                                <template #empty> No hay registros </template>
                                <Column field="nombre" header="Categoría"></Column>
                                <Column field="descripcion" header="Descripción"></Column>
                            </DataTable>
                        </div>
                    </TabPanel>
                    <TabPanel value="1">
                        <div class="card">
                            <DataTable v-model:filters="filters"
                                :value="categoriesEgresos" tableStyle="min-width: 50rem" selectionMode="single" :loading="loadingCategories">
                                <template #header>
                                    <div class="flex justify-start">
                                        <IconField class="w-full">
                                            <InputIcon>
                                                <i class="pi pi-search" />
                                            </InputIcon>
                                            <InputText class="w-full" v-model="filters['nombre'].value" placeholder="Búsqueda de categoría" />
                                        </IconField>
                                    </div>
                                </template>
                                <template #empty> No hay registros </template>
                                <Column field="nombre" header="Categoría"></Column>
                                <Column field="descripcion" header="Descripción"></Column>
                            </DataTable>
                        </div>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </section>
    </section>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useCategoryStore } from '@/stores/category.store';
import { FilterMatchMode } from '@primevue/core/api';
import { onMounted, ref } from 'vue';

const filters = ref({
    nombre: { value: null, matchMode: FilterMatchMode.CONTAINS },
    description: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});

const categoryStore = useCategoryStore();
const { fetchCategories } = categoryStore;
const { categories, loadingCategories } = storeToRefs(categoryStore);
const categoriesIngresos = ref([]);
const categoriesEgresos = ref([]);

onMounted(async () => {
    await fetchCategories();
    categoriesIngresos.value = categories.value.filter((category) => category.es_entrada === 1);
    categoriesEgresos.value = categories.value.filter((category) => category.es_entrada === 0);
});

</script>