<template>
    <article class="flex flex-col mb-2 w-full">
        <Select :invalid="invalid" :filter="filter" v-model="model" :options="options" :optionLabel="optionLabel" :optionValue="optionValue" :placeholder="placeholder"
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
import { computed } from 'vue';

const invalid = computed(() => errors.length > 0);
const model = defineModel();
const { errors } = defineProps({
    options: {
        type: Array,
        default: []
    },
    optionLabel: {
        type: String,
        default: 'nombre'
    },
    optionValue: {
        type: String,
        default: 'id'
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
