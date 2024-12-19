export default [
    {
        path: '/flujo-caja',
        name: 'flujo-caja-diario',
        meta:{
            title: 'Flujo de Caja Diario',
            show: true,
            icon: 'pi pi-money-bill',
            requiresAuth: true
        },
        component: () => import('../views/layers/client/flow-money/FlowMoneyDayView.vue'),
    }
];