export default [
    {
        path: '/',
        name: 'dashboard',
        meta:{
            title: 'Dashboard',
            show: true,
            icon: 'pi pi-home',
            requiresAuth: true
        },
        component: () => import('../views/layers/client/DashboardView.vue'),
    }
];