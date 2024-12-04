export default [
    {
        path: '/transactions',
        name: 'transactions',
        meta:{
            title: 'Transacciones',
            show: true,
            icon: 'pi pi-list',
            requiresAuth: true
        },
        component: () => import('../views/layers/client/transaction/TransactionHomeView.vue'),
    }
];