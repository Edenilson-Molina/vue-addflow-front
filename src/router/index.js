import { storeToRefs } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';

import { useSessionStore } from '@/stores/index.store';

import authenticationRoutes from '@/views/security/routes/authentication.routes';

// Define routes
const routes = [
    ...authenticationRoutes,
    {
        path: '/',
        component: () => import('@/views/layers/client/LayoutClient.vue'),
        children: [
            {
                path: '',
                name: 'home',
                meta: {
                    title: 'Inicio',
                    requiresAuth: true,
                },
                component: () => import('@/views/layers/client/HomeView.vue'),
            },
        ]
    },
    {
        path: '/admin',
        component: () => import('@/views/layers/admin/LayoutAdmin.vue'),
        children: [
            {
                path: '',
                name: 'dashboard',
                meta: {
                    title: 'Panel de control',
                    requiresAuth: true,
                },
                component: () => import('@/views/layers/admin/DashboardView.vue'),
            },
        ]
    },
    {
        path: '/forbidden',
        name: 'forbidden',
        meta: {
            title: 'Acceso denegado',
        },
        component: () => import('../views/exceptions/ForbiddenView.vue'),
    }
];

// Create router instance
const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach(async (to, from, next) => {
    document.title = to.meta?.title || 'AddFlow';

    const routeList = router.getRoutes();
    const routeExists = routeList.find(route => route.name === to.name);
    if (!routeExists) {
        next({ name: 'forbidden' });
        return;
    }

    const authStore = useSessionStore();
    const { accessToken } = storeToRefs(authStore);

    if (to.meta?.requiresAuth) {
        // Check if token exists
        if (!accessToken.value) {
            next({ name: 'login', replace: true });
            return;
        } else {
            // Check if user is authorized
            const authorized = true; // (Pending to implement)
            if (!authorized) {
                next({ name: 'forbidden' });
                return;
            } else {
                next();
            }
        }
    } else {
        if (accessToken?.value && to.name === 'login') {
            next({ name: 'dashboard' });
            return;
        }
        next();
    }
});

export default router;
