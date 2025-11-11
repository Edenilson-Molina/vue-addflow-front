<template>
    <IftaLabel>
        <DatePicker v-model="model" inputId="date" inline iconDisplay="input" variant="filled" dateFormat="dd/mm/yy" :disabledDays="[0]"/>
    </IftaLabel>
</template>

<script setup>

const model = defineModel();

</script>
