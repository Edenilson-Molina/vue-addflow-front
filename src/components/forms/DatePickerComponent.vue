<template>
    <IftaLabel>
        <DatePicker v-model="model" inputId="date" inline showWeek iconDisplay="input" variant="filled" dateFormat="dd/mm/yy"/>
    </IftaLabel>
</template>

<script setup>

const model = defineModel();

</script>