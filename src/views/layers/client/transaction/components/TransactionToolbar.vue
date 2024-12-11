<template>
    <Toolbar class="mb-6">
        <template #start>
            <Button label="Nuevo" icon="pi pi-plus" class="mr-2" @click="toggleNewTransaction" />
        </template>
        <template #center>
            <div class="flex justify-start">
                <IconField class="w-full">
                    <InputIcon>
                        <i class="pi pi-search" />
                    </InputIcon>
                    <InputText class="w-full" v-model="filterTransaction" placeholder="Búsqueda" />
                </IconField>
            </div>
        </template>
        <template #end>
            <div class="card flex justify-center">
                <SelectButton v-model="typeTransaction" :options="optionsTypeTransaction" />
            </div>
        </template>
    </Toolbar>
</template>

<script setup>
const typeTransaction = defineModel('typeTransaction');
const filterTransaction = defineModel('filterTransaction');

const props = defineProps({
    optionsTypeTransaction: {
        type: Array,
        required: true
    }
});

const emit = defineEmits(['toggleNewTransaction']);

const toggleNewTransaction = () => {
    emit('toggleNewTransaction');
};

</script>