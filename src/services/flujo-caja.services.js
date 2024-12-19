import network from './network.services';
import { dateToApiFormat } from '@/utils/global-functions';

export const getSaldoHistorico = async () => {
    return await network.get('/flujo-caja/saldo-historico');
}

export const updateFlujoHistorico = async (id, saldo_final) => {
    return await network.post(`/flujo-caja/saldo-historico/${id}`, {
        'saldo_final': saldo_final
    });
}

export const getFlujoCajaDiario = async (date) => {
    const apiDate = dateToApiFormat(date);
    return await network.post('/flujo-caja/diario', {
        'date': apiDate
    });
}