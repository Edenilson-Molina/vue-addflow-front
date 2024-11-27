<template>
    <article class="flex flex-col mb-2">
        <InputText class="w-full" :type="type" v-model="model" :placeholder="placeholder" />
        <Message v-if="errors" severity="error" size="small" variant="simple">
            <small v-for="error in errors">
                {{ error.$message }}
            </small>
        </Message>
    </article>
</template>

<script setup>
import { ref } from 'vue';

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