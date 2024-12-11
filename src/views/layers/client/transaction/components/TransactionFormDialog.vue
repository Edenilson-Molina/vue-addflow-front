<template>
    <Dialog v-model:visible="visible" modal :style="{ width: '30rem' }">
        <template #header>
            <div class="inline-flex items-center justify-between gap-2 w-full mr-2">
                <div class="flex items-center gap-2">
                    <i class="pi pi-wallet"></i>
                    <span class="font-bold whitespace-nowrap">Registrar operación</span>
                </div>
                <div class="flex flex-col items-center">
                    <ToggleButton v-model="form.estado" class="w-32 text-sm" onLabel="Aprobada" offLabel="Pendiente"
                        onIcon="pi pi-check" offIcon="pi pi-times" />
                </div>
            </div>
        </template>
        <div class="flex justify-between items-center mb-4">
            <span class="text-surface-500 dark:text-surface-400">Información general</span>
            <div class="flex items-center gap-1">
                <span class="text-surface-500 dark:text-surface-400">{{ form.es_entrada ? 'Ingreso' :
                    'Egreso' }}</span>
                <ToggleSwitch v-model="form.es_entrada">
                    <template #handle="{ checked }">
                        <i :class="['!text-xs pi', { 'pi-check': checked }]" />
                    </template>
                </ToggleSwitch>
            </div>
        </div>
        <div class="flex items-center gap-2 mb-4">
            <label class="font-semibold w-24">Remitido a</label>
            <InputTextComponent v-model="form.remitido_a" class="flex-auto" autocomplete="off"
                :placeholder="'Institución o negocio remitente'" :errors="v$.remitido_a.$errors" />
        </div>
        <div class="flex items-center gap-2 mb-2">
            <label class="font-semibold w-24">Descripción</label>
            <TextareaComponent v-model="form.descripcion" class="flex-auto" autocomplete="off"
                :placeholder="'Breve descripción de la operación a realizar'" :errors="v$.descripcion.$errors" />
        </div>
        <span class="text-surface-500 dark:text-surface-400 block mb-4">Detalles financieros</span>
        <div class="flex flex-row gap-2">
            <div class="flex flex-col gap-1 mb-2 w-48">
                <label class="font-semibold w-full text-center">Monto</label>
                <InputNumberComponent v-model="form.monto" class="flex-auto" autocomplete="off" :placeholder="'$##.##'"
                    :errors="v$.monto.$errors" />
            </div>
            <div class="flex flex-col gap-1 mb-2 w-full">
                <label class="font-semibold w-full text-center">Cuenta</label>
                <Select v-model="form.cuenta_id" :options="accounts" class="flex-auto" 
                    :placeholder="'Cuenta asociada'" :errors="v$.cuenta_id.$errors" />
            </div>
        </div>
        <span class="text-surface-500 dark:text-surface-400 block mb-2">Categoría</span>
        <div class="flex flex-row gap-2">
            <div class="flex flex-col gap-1 w-full">
                <label class="font-semibold w-full text-center">Categoría</label>
                <Select v-model="form.categoria_id" :filter="true" :options="categoriesFilter" class="flex-auto"
                    :placeholder="'Categoría de la operación'" :errors="v$.categoria_id.$errors" />
            </div>
        </div>
        <template #footer>
            <Button label="Cancelar" text severity="secondary" @click="visible = false" />
            <Button v-if="btnEdit" label="Guardar Cambios" severity="contrast" @click="handleEditTransaction" />
            <Button v-else label="Registrar" severity="success" @click="handleSaveTransaction" />
        </template>
    </Dialog>
</template>

<script setup>
import Select from "@/components/forms/SelectComponent.vue";
import InputTextComponent from "@/components/forms/InputTextComponent.vue";
import TextareaComponent from "@/components/forms/TextareaComponent.vue";
import InputNumberComponent from "@/components/forms/InputNumberComponent.vue";

const visible = defineModel('visible');
const form = defineModel('form');

const props = defineProps({
    accounts: {
        type: Array,
        required: true
    },
    categoriesFilter: {
        type: Array,
        required: true
    },
    btnEdit: {
        type: Boolean,
        required: true
    },
    v$: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['handleSaveTransaction','handleEditTransaction']);

const handleSaveTransaction = () => {
    emit('handleSaveTransaction');
};

const handleEditTransaction = () => {
    emit('handleEditTransaction');
};
</script>