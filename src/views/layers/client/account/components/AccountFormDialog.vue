<template>
  <Dialog v-model:visible="visible" modal :style="{ width: '30rem' }" position="top">
    <template #header>
      <div class="inline-flex items-center justify-between gap-2 w-full mr-2">
        <div class="flex items-center gap-2">
          <i class="pi pi-wallet"></i>
          <span class="font-bold whitespace-nowrap">Cuentas</span>
        </div>
      </div>
    </template>
    <div class="flex justify-between items-center mb-4">
      <span class="text-surface-500 dark:text-surface-400">Información general</span>
    </div>
    <div class="flex items-center gap-2 mb-4">
      <label class="font-semibold w-24">Cuenta</label>
      <InputTextComponent v-model="form.nombre" :errors="v$.nombre.$errors"
                          class="flex-auto" autocomplete="off"
                          :placeholder="'Nombre de la cuenta'" />
    </div>
    <div class="flex items-center gap-2 mb-4">
      <label class="font-semibold w-24">Tipo de cuenta</label>
      <div class="flex-auto">
        <SelectComponent v-model="form.tipo_cuenta_id" :errors="v$.tipo_cuenta_id.$errors" :options="typeAccounts"
                          :placeholder="'Seleccione un tipo de cuenta'" />
      </div>
    </div>
    <div class="flex justify-between items-center mb-4">
      <span class="text-surface-500 dark:text-surface-400">Información adicional</span>
    </div>
    <div v-if="flag" class="flex flex-col items-center gap-2 mb-2">
      <label class="font-semibold w-full">Institucion bancaria</label>
      <SelectComponent v-model="form.banco_id" :errors="v$.banco_id.$errors" :options="banks" filter
                          :placeholder="'Seleccione una institucion'" />
    </div>
    <div v-if="flag" class="flex flex-col items-center gap-2 mb-2">
      <label class="font-semibold w-full">No. de Cuenta</label>
      <InputTextComponent v-model="form.numero_cuenta" :errors="v$.numero_cuenta.$errors"
                          class="w-full" autocomplete="off"
                          :placeholder="'Digite el numero de la cuenta'" />
    </div>
    <div class="flex flex-col items-center gap-2 mb-2">
      <label class="font-semibold w-full">Saldo Inicial</label>
      <InputNumberComponent v-model="form.saldo_inicial" :errors="v$.saldo_inicial.$errors"
                          class="w-full" autocomplete="off"
                          :placeholder="'###.##'" />
    </div>
    <template #footer>
      <Button label="Cancelar" text severity="secondary" @click="visible = false"/>
      <Button v-if="btnEdit" label="Guardar Cambios" severity="contrast" @click="handleEditAccount"/>
      <Button v-else label="Registrar" severity="success" @click="handleSaveAccount"/>
    </template>
  </Dialog>
</template>

<script setup>
import SelectComponent from "@/components/forms/SelectComponent.vue";
import InputNumberComponent from "@/components/forms/InputNumberComponent.vue";
import InputTextComponent from "@/components/forms/InputTextComponent.vue";

const visible = defineModel('visible');
const form = defineModel('form');

defineProps({
  typeAccounts: {
    type: Array,
    default: []
  },
  banks: {
    type: Array,
    default: []
  },
  btnEdit: {
    type: Boolean,
    default: false
  },
  flag: {
    type: Boolean,
    default: false
  },
  v$: {
    type: Object,
    required: true
  }
});

const emit = defineEmits([
  'handleSaveAccount',
  'handleEditAccount'
]);

const handleSaveAccount = () => {
  emit('handleSaveAccount');
};

const handleEditAccount = () => {
  emit('handleEditAccount');
};
</script>
