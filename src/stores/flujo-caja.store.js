import { defineStore } from "pinia";
import { ref } from "vue";
import { getSaldoHistorico, updateFlujoHistorico, getFlujoCajaDiario } from '@/services/flujo-caja.services';

export const useFlujoCajaStore = defineStore('flujo-caja', () => {
    const idSaldoHistorico = ref(0);
    const saldoHistorico = ref(0.00);
    const flujoCajaDiario = ref([]);
    const totalByCategories = ref([]);

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

    const fetchFlujoCajaDiario = async (date) => {
        const response = await getFlujoCajaDiario(date);
        if(response?.status === 200) {
            flujoCajaDiario.value = response?.data.flujoCajaDiario;
            totalByCategories.value = response?.data.totalesByCategories
        }
    }

    return {
        saldoHistorico,
        flujoCajaDiario,
        totalByCategories,
        fetchSaldoHistorico,
        updateSaldoHistorico,
        fetchFlujoCajaDiario
    }
});