import network from './network.services';

export const getTransactions = async () => {
    const currentMonth = new Date().getMonth() + 1;
    const currentDay = new Date().getDate();
    const currentYear = new Date().getFullYear();
    const response = await network.post('/transacciones/search', {
        "filters": [
            { 'field': 'created_at', 'operator': '=', 'value': `${currentYear}-${currentMonth}-${currentDay}` }
        ],
    });
    return response;
}

export const createTransaction = async (transaction) => {
    const response = await network.post('/transacciones', transaction);
    return response;
}

export const updateTransaction = async (id, transaction) => {
    const response = await network.put(`/transacciones/${id}`, transaction);
    return response;
}