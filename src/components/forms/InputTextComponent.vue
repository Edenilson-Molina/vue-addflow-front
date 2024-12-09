<template>
    <article class="flex flex-col mb-2">
        <InputText :invalid="invalid" class="w-full" :type="type" v-model="model" :placeholder="placeholder" />
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
const { placeholder, errors, type } = defineProps({
    placeholder: {
        type: String,
        required: false,
        default: ''
    },
    errors: {
        type: Array,
        default: []
    },
    type: {
        type: String,
        default: 'text'
    }
});
</script>