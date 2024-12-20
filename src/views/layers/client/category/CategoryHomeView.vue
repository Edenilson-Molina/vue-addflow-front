<template>
  <section class="container mx-auto">
    <header class="flex flex-col sm:flex-row gap-2">
      <article class="flex items-center">
        <Button icon="pi pi-plus" severity="contrast" rounded variant="outlined"
                aria-label="Star" @click="toggleNewCategory"/>
        <CategoryFormDialog
          v-model:visible="visible"
          v-model:form="form"
          :btnEdit="btnEdit" :v$="v$"
          @handleSaveTransaction="handleSaveTransaction"
          @handleEditCategory="handleEditCategory"/>
      </article>
      <article>
        <h1 class="text-3xl font-bold">Categorias</h1>
        <p class="text-gray-500">Visualiza las categorias disponibles</p>
      </article>
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
                         :value="categoriesIngresos" tableStyle="min-width: 50rem" selectionMode="single"
                         :loading="loadingCategories">
                <template #header>
                  <div class="flex justify-start">
                    <IconField class="w-full">
                      <InputIcon>
                        <i class="pi pi-search"/>
                      </InputIcon>
                      <InputText class="w-full" v-model="filters['nombre'].value" placeholder="Búsqueda de categoría"/>
                    </IconField>
                  </div>
                </template>
                <template #empty> No hay registros</template>
                <Column field="nombre" header="Categoría"></Column>
                <Column field="descripcion" header="Descripción"></Column>
                <Column header="Estado" header-class="flex justify-center" body-class="text-center">
                  <template #body="slotProps">
                    <Tag :severity="slotProps.data.estado ? 'success' : 'danger'" rounded
                         :value="slotProps.data.estado ? 'Activo' : 'Inactivo'"/>
                  </template>
                </Column>
                <Column class="text-center">
                  <template #body="slotProps">
                    <Button icon="pi pi-pencil" rounded severity="success" variant="outlined" text
                            @click="showCategory(slotProps.data)"/>
                  </template>
                </Column>
              </DataTable>
            </div>
          </TabPanel>
          <TabPanel value="1">
            <div class="card">
              <DataTable v-model:filters="filters"
                         :value="categoriesEgresos" tableStyle="min-width: 50rem" selectionMode="single"
                         :loading="loadingCategories">
                <template #header>
                  <div class="flex justify-start">
                    <IconField class="w-full">
                      <InputIcon>
                        <i class="pi pi-search"/>
                      </InputIcon>
                      <InputText class="w-full" v-model="filters['nombre'].value" placeholder="Búsqueda de categoría"/>
                    </IconField>
                  </div>
                </template>
                <template #empty> No hay registros</template>
                <Column field="nombre" header="Categoría"></Column>
                <Column field="descripcion" header="Descripción"></Column>
                <Column header="Estado" header-class="flex justify-center" body-class="text-center">
                  <template #body="slotProps">
                    <Tag :severity="slotProps.data.estado ? 'success' : 'danger'" rounded
                         :value="slotProps.data.estado ? 'Activo' : 'Inactivo'"/>
                  </template>
                </Column>
                <Column class="text-center">
                  <template #body="slotProps">
                    <Button icon="pi pi-pencil" rounded severity="success" variant="outlined" text
                            @click="showCategory(slotProps.data)"/>
                  </template>
                </Column>
              </DataTable>
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </section>
  </section>
</template>

<script setup>
import CategoryFormDialog from "@/views/layers/client/category/components/CategoryFormDialog.vue";

import {storeToRefs} from 'pinia';
import {onMounted, ref, watch} from 'vue';
import {useVuelidate} from "@vuelidate/core";
import {required, helpers} from '@vuelidate/validators';
import {useCategoryStore} from '@/stores/category.store';
import {useAuthStore} from "@/stores/auth.store.js";
import {FilterMatchMode} from '@primevue/core/api';

const visible = ref(false);
const btnEdit = ref(false);
const idCategory = ref(null);
const form = ref({
  nombre: null,
  descripcion: null,
  estado: true,
  es_entrada: true,
});

const rules = {
  nombre: {
    required: helpers.withMessage('Se necesita el nombre de la categoria', required),
  },
  descripcion: {
    required: helpers.withMessage('Proporcione una breve descripcion', required),
  },
};

const v$ = useVuelidate(rules, form);

const filters = ref({
  nombre: {value: null, matchMode: FilterMatchMode.CONTAINS},
  description: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
});

const categoryStore = useCategoryStore();
const authStore = useAuthStore();
const { fetchCategories, saveCategory, editCategory } = categoryStore;
const {categories, loadingCategories} = storeToRefs(categoryStore);
const {user} = storeToRefs(authStore);
const categoriesIngresos = ref([]);
const categoriesEgresos = ref([]);

const toggleNewCategory = () => {
  // Reset form
  visible.value = true;
  btnEdit.value = false;
  idCategory.value = null;
  // Reset validation
  v$.value.$reset();
  // Reset form values
  form.value.nombre = '';
  form.value.es_entrada = true;
  form.value.descripcion = '';
  form.value.estado = false;
};

const handleSaveTransaction = async () => {
  v$.value.$touch();
  if (v$.$invalid) return;
  await saveCategory({...form.value, created_by: user.value.id});
  visible.value = false;
};

const showCategory = (category) => {
  form.value = {...category};
  idCategory.value = category.id;
  btnEdit.value = true;
  visible.value = true;
};

const handleEditCategory = async () => {
  v$.value.$touch();
  if (v$.$invalid) return;
  await editCategory(idCategory.value,{ ...form.value });
  visible.value = false;
};

onMounted(async () => {
  await fetchCategories();
  categoriesIngresos.value = categories.value.filter((category) => category.es_entrada === true);
  categoriesEgresos.value = categories.value.filter((category) => category.es_entrada === false);
});

watch(categories, () => {
  categoriesIngresos.value = categories.value.filter((category) => category.es_entrada === true);
  categoriesEgresos.value = categories.value.filter((category) => category.es_entrada === false);
});

</script>
