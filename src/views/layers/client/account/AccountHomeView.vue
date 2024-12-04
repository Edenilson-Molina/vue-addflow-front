<template>
    <section class="flex flex-col w-full">
        <header>
            <h1 class="text-3xl font-bold">Cuentas Disponibles</h1>
            <p class="text-gray-500">Administra tus cuentas</p>
        </header>
        <section v-if="loadingAccount" class="flex flex-1 justify-center items-center">
            <ProgressSpinner/>
        </section>
        <section v-else class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Fieldset class="animate-scalein animate-once animate-duration-1000" v-for="account in accounts" :key="account.id" :legend="account.nombre">
                <div class="flex flex-col gap-2">
                    <div class="flex gap-2 justify-between items-center">
                        <Chip v-if="account.banco" :icon="'pi pi-credit-card'" :label="account.tipo_cuenta.nombre" />
                        <Chip v-else :icon="'pi pi-wallet'" :label="account.tipo_cuenta.nombre" />
                        <p class="text-gray-500 text-xl font-mono font-semibold">{{ account.numero_cuenta }}</p>
                    </div>
                    <div class="flex flex-col gap-2 justify-center">
                        <Tag class="text-3xl font-medium">$ {{ account.saldo_inicial }}</Tag>
                        <p class="text-center"> {{ account.banco?.nombre }}</p>
                    </div>
                </div>
            </Fieldset>
        </section>
    </section>
</template>
<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useBankStore } from "@/stores/bank.store";
import { useAccountStore } from "@/stores/account.store";
import { storeToRefs } from "pinia";

const bankStore = useBankStore();
const accountStore = useAccountStore();
const { fetchBanks } = bankStore;
const { fetchAccounts } = accountStore;
const { banks } = storeToRefs(bankStore);
const { accounts, loadingAccount } = storeToRefs(accountStore);

onMounted(async () => {
    await fetchBanks();
    await fetchAccounts();
    console.log("accounts");
});

onUnmounted(() => {
    loadingAccount.value = true;
});

</script>