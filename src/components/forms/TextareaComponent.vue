<template>
    <article class="flex flex-col mb-2">
        <Textarea v-model="model" :rows="rows" class="resize-none" :placeholder="placeholder"/>
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
    rows: {
        type: Number,
        required: false,
        default: 3
    },
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