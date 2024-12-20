import network from './network.services';

export const getAccounts = async () => {
    return await network.get('/cuentas');
}

export const createAccount = async (account) => {
    return await network.post('/cuentas', account);
}

export const updateAccount = async (id, account) => {
    return await network.put(`/cuentas/${id}`, account);
}

export const getTypesAccounts = async () => {
    return await network.get('/tipo-cuentas');
}
