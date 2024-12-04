<template>
    <article class="flex flex-col mb-2 w-full">
        <InputNumber class="w-full" v-model="model" :placeholder="placeholder" inputId="currency-us" mode="currency" currency="USD" locale="en-US" fluid/>
        <Message v-if="errors" severity="error" size="small" variant="simple">
            <small v-for="error in errors" class="font-normal">
                {{ error.$message }}
            </small>
        </Message>
    </article>
</template>

<script setup>

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
    }
});
</script>