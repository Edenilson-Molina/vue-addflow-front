<template>
    <article class="flex flex-col mb-2 w-full">
        <Select :filter="filter" v-model="model" :options="options" :optionLabel="optionLabel" :placeholder="placeholder"
        class="w-full">
        <template #emptyfilter>
            <p>No se encontraron resultados</p>
        </template>
        </Select>
        <Message v-if="errors" severity="error" size="small" variant="simple">
            <small v-for="error in errors" class="font-normal">
                {{ error.$message }}
            </small>
        </Message>
    </article>
</template>

<script setup>
const model = defineModel();
const props = defineProps({
    options: {
        type: Array,
        default: []
    },
    optionLabel: {
        type: String,
        default: 'nombre'
    },
    placeholder: {
        type: String,
        default: ''
    },
    filter: {
        type: Boolean,
        default: false
    },
    errors: {
        type: Array,
        default: []
    }
});
</script>
