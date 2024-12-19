import network from './network.services';
import { dateToApiFormat } from '@/utils/global-functions';

export const getTransactions = async () => {
    const apiDate = dateToApiFormat(new Date());
    const response = await network.post('/transacciones/search', {
        "filters": [
            { 'field': 'created_at', 'operator': '=', 'value': apiDate }
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

export const getTotalByDate = async () => {
    const apiDate = dateToApiFormat(new Date());
    const response = await network.post('/transacciones/total-by-date',
        {
            "date": apiDate
        }
    );
    return response;
}