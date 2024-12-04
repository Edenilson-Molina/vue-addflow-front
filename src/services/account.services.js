import network from './network.services';  

export const getAccounts = async () => {
    return await network.get('/cuentas');
}