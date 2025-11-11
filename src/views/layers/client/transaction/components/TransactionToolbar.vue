<template>
    <article class="flex flex-col gap-4 md:flex-row my-8">
      <div class="w-full">
        <div class="flex justify-start">
          <IconField class="w-full">
            <InputIcon>
              <i class="pi pi-search" />
            </InputIcon>
            <InputText class="w-full" v-model="filterTransaction" placeholder="Búsqueda" />
          </IconField>
        </div>
      </div>
      <div class="flex justify-start w-full">
        <div class="card flex justify-center">
          <SelectButton v-model="typeTransaction" :options="optionsTypeTransaction" />
        </div>
      </div>
      <div>
          <Button label="Nuevo" icon="pi pi-plus" class="mr-2" @click="toggleNewTransaction" />
      </div>
    </article>
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
