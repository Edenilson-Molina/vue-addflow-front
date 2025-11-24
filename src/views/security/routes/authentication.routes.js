export default [
    {
        path: '/login',
        name: 'login',
        meta: {
            title: 'Inicio de sesión',
        },
        component: () => import('@/views/security/views/LoginView.vue'),
    }
];