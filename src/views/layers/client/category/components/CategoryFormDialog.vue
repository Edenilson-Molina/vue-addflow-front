<template>
  <Dialog v-model:visible="visible" modal :style="{ width: '30rem' }">
    <template #header>
      <div class="inline-flex items-center justify-between gap-2 w-full mr-2">
        <div class="flex items-center gap-2">
          <i class="pi pi-tag"></i>
          <span class="font-bold whitespace-nowrap">Categoria</span>
        </div>
        <div class="flex flex-col items-center">
          <ToggleButton v-model="form.estado" class="w-32 text-sm"
                        onLabel="Aprobada" offLabel="Pendiente"
                        onIcon="pi pi-check" offIcon="pi pi-times"/>
        </div>
      </div>
    </template>
    <div class="flex justify-between items-center mb-4">
      <span class="text-surface-500 dark:text-surface-400">Información general</span>
      <div class="flex items-center gap-1">
        <span class="text-surface-500 dark:text-surface-400">
          {{ form.es_entrada ? 'Ingreso' : 'Egreso' }}
        </span>
        <ToggleSwitch v-model="form.es_entrada">
          <template #handle="{ checked }">
            <i :class="['!text-xs pi', { 'pi-check': checked }]"/>
          </template>
        </ToggleSwitch>
      </div>
    </div>
    <div class="flex items-center gap-2 mb-4">
      <label class="font-semibold w-24">Categoria</label>
      <InputTextComponent v-model="form.nombre" :errors="v$.nombre.$errors"
                          class="flex-auto" autocomplete="off"
                          :placeholder="'Nombre de la categoria'" />
    </div>
    <div class="flex items-center gap-2 mb-2">
      <label class="font-semibold w-24">Descripción</label>
      <TextareaComponent v-model="form.descripcion" :errors="v$.descripcion.$errors"
                         class="flex-auto" autocomplete="off"
                         :placeholder="'Breve descripción de la categoria'" />
    </div>
    <template #footer>
      <Button label="Cancelar" text severity="secondary" @click="visible = false"/>
      <Button v-if="btnEdit" label="Guardar Cambios" severity="contrast" @click="handleEditCategory"/>
      <Button v-else label="Registrar" severity="success" @click="handleSaveTransaction"/>
    </template>
  </Dialog>
</template>

<script setup>
import TextareaComponent from "@/components/forms/TextareaComponent.vue";
import InputTextComponent from "@/components/forms/InputTextComponent.vue";

const visible = defineModel('visible');
const form = defineModel('form');

defineProps({
  btnEdit: {
    type: Boolean,
    default: false
  },
  v$: {
    type: Object,
    required: true
  }
});

const emit = defineEmits([
  'handleSaveTransaction',
  'handleEditCategory'
]);

const handleSaveTransaction = () => {
  emit('handleSaveTransaction');
};

const handleEditCategory = () => {
  emit('handleEditCategory');
};

</script>
