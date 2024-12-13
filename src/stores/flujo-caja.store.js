import { defineStore } from "pinia";
import { ref } from "vue";
import { getSaldoHistorico, updateFlujoHistorico } from '@/services/flujo-caja.services';

export const useFlujoCajaStore = defineStore('flujo-caja', () => {
    const idSaldoHistorico = ref(0);
    const saldoHistorico = ref(0.00);

    const fetchSaldoHistorico = async () => {
        const response = await getSaldoHistorico();
        if(response?.status === 200) {
            idSaldoHistorico.value = response?.data[0]?.id;
            saldoHistorico.value = response?.data[0]?.saldo_final;
        }
    }

    const updateSaldoHistorico = async () => {
        const response = await updateFlujoHistorico(idSaldoHistorico.value, saldoHistorico.value);
    }

    return {
        saldoHistorico,
        fetchSaldoHistorico,
        updateSaldoHistorico
    }
});