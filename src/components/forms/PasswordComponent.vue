<template>
    <article class="flex flex-col mb-2">
        <Password input-class="w-full" v-model="model" :placeholder="placeholder" :feedback="feedback" toggleMask/>
        <Message v-if="errors" severity="error" size="small" variant="simple">
            <small v-for="error in errors" class="font-normal">
                {{ error.$message }}
            </small>
        </Message>
    </article>
</template>

<script setup>
import { Password } from 'primevue';
const model = defineModel();
const { placeholder, errors, feedback } = defineProps({
    placeholder: {
        type: String,
        required: false,
        default: ''
    },
    errors: {
        type: Array,
        default: []
    },
    feedback: {
        type: Boolean,
        default: false
    }
});
</script>