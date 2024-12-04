export default [
    {
        path: '/categories',
        name: 'categories',
        meta:{
            title: 'Categorías',
            show: true,
            icon: 'pi pi-list',
            requiresAuth: true
        },
        component: () => import('../views/layers/client/category/CategoryHomeView.vue'),
    }
];