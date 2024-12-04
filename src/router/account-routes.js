export default [
    {
        path: '/accounts',
        name: 'accounts',
        meta:{
            title: 'Cuentas disponibles',
            show: true,
            icon: 'pi pi-home',
            requiresAuth: true
        },
        component: () => import('../views/layers/client/account/AccountHomeView.vue'),
    }
];