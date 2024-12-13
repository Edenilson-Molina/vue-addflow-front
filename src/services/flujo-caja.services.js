import network from './network.services';

export const getSaldoHistorico = async () => {
    return await network.get('/flujo-caja/saldo-historico');
}

export const updateFlujoHistorico = async (id, saldo_final) => {
    return await network.post(`/flujo-caja/saldo-historico/${id}`, {
        'saldo_final': saldo_final
    });
}   