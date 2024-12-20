<template>
  <section class="flex flex-col w-full">
    <header class="flex flex-col sm:flex-row gap-2">
      <article>
        <Button icon="pi pi-plus" severity="contrast" rounded variant="outlined"
                aria-label="Star" @click="toggleNewAccount"/>
        <AccountFormDialog
          v-model:visible="visible"
          v-model:form="form"
          :btnEdit="btnEdit"
          :v$="v$"
          :typeAccounts="typeAccounts"
          :flag="flag"
          :banks="banks"
          @handleSaveAccount="handleSaveAccount"
          @handleEditAccount="handleEditAccount"
        />
      </article>
      <article>
        <h1 class="text-3xl font-bold">Cuentas Disponibles</h1>
        <p class="text-gray-500">Administra tus cuentas</p>
      </article>
    </header>
    <section v-if="loadingAccount" class="flex flex-1 justify-center items-center">
      <ProgressSpinner strokeWidth="5"/>
    </section>
    <section v-else class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Fieldset class="animate-scalein animate-once animate-duration-75 cursor-pointer hover:shadow-lg hover:scale-105 transform transition-transform duration-300 ease-in-out"
                v-for="account in accounts" :key="account.id"
                :legend="account.nombre" @click="showAccount(account)">
        <div class="flex flex-col gap-2">
          <div class="flex gap-2 justify-between items-center">
            <Chip v-if="account.banco" :icon="'pi pi-credit-card'" :label="account.tipo_cuenta.nombre"/>
            <Chip v-else :icon="'pi pi-wallet'" :label="account.tipo_cuenta.nombre"/>
            <p class="text-gray-500 text-xl font-mono font-semibold">{{ account.numero_cuenta }}</p>
          </div>
          <div class="flex flex-col gap-2 justify-center">
            <Tag class="text-3xl font-medium">${{ formatNumber(account.saldo_inicial) }}</Tag>
            <p class="text-center"> {{ account.banco?.nombre }}</p>
          </div>
        </div>
      </Fieldset>
    </section>
  </section>
</template>
<script setup>
import AccountFormDialog from "@/views/layers/client/account/components/AccountFormDialog.vue";
import {formatNumber} from "@/utils/global-functions.js";

import {onMounted, ref, watch} from "vue";
import {storeToRefs} from "pinia";
import {useVuelidate} from "@vuelidate/core";
import {required, helpers} from "@vuelidate/validators";
import {useBankStore} from "@/stores/bank.store";
import {useAccountStore} from "@/stores/account.store";

const bankStore = useBankStore();
const accountStore = useAccountStore();
const {fetchBanks} = bankStore;
const {fetchAccounts, fetchTypeAccounts} = accountStore;
const {accounts, loadingAccount, typeAccounts} = storeToRefs(accountStore);
const {banks} = storeToRefs(bankStore);

const visible = ref(false);
const btnEdit = ref(false);
const flag = ref(false);
const idAccount = ref(null);
const form = ref({
  nombre: '',
  tipo_cuenta_id: 1,
  banco_id: null,
  numero_cuenta: '',
  saldo_inicial: null,
});

const rules = {
  nombre: {required: helpers.withMessage('El nombre de la cuenta es requerido', required)},
  tipo_cuenta_id: {required: helpers.withMessage('El tipo de cuenta es requerido', required)},
  banco_id: {required: helpers.withMessage('El banco es requerido', required)},
  numero_cuenta: {required: helpers.withMessage('El número de cuenta es requerido', required)},
  saldo_inicial: {required: helpers.withMessage('El saldo inicial es requerido', required)},
};

const v$ = useVuelidate(rules, form);

const toggleNewAccount = () => {
  // Reset form
  v$.value.$reset();
  visible.value = true;
  btnEdit.value = false;
  form.value.nombre = '';
  form.value.banco_id = null;
  form.value.tipo_cuenta_id = 1;
  form.value.numero_cuenta = '';
  form.value.saldo_inicial = null;
};

const handleSaveAccount = async () => {
  v$.value.$touch();

  const isCash = form.value.tipo_cuenta_id === 1 &&
    !v$.value.nombre.$error &&
    !v$.value.saldo_inicial.$error;

  if(form.value.tipo_cuenta_id === 2){
    if (v$.value.$invalid) return;
    await accountStore.saveAccount(form.value);
    visible.value = false;
  } else{
    if(isCash) {
      await accountStore.saveAccount(form.value);
      visible.value = false;
    }
  }
};

const showAccount = async (account) => {
  idAccount.value = account.id;
  form.value = {...account};
  visible.value = true;
  btnEdit.value = true;
};

const handleEditAccount = async () => {
  v$.value.$touch();
  const isCash = form.value.tipo_cuenta_id === 1 &&
    !v$.value.nombre.$error &&
    !v$.value.saldo_inicial.$error;

  if(form.value.tipo_cuenta_id === 2){
    if (v$.value.$invalid) return;
    await accountStore.editAccount(idAccount.value, form.value);
    visible.value = false;
  } else{
    if(isCash) {
      await accountStore.editAccount(idAccount.value, form.value);
      visible.value = false;
    }
  }
};

watch(() => form.value.tipo_cuenta_id, (value) => {
  switch (value) {
    case 2:
      flag.value = true;
      break;
    default:
      flag.value = false;
      break;
  }
});

onMounted(async () => {
  await fetchAccounts();
  await fetchBanks();
  await fetchTypeAccounts();
});
</script>
