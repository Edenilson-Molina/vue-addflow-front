import { createRouter, createWebHistory } from 'vue-router';
import systemRoutes from './system-routes';
import { useAuthStore } from '@/stores/auth.store';
import { storeToRefs } from 'pinia';

// Define routes
const routes = [
  {
    path: '/login',
    name: 'login',
    meta:{
      title: 'Inicio de sesión',
    },
    component: () => import('../views/auth/LoginView.vue'),
  },
  {
    path:'/',
    name:'layout',
    component: () => import('../views/layouts/DefaultLayout.vue'),
    children:[
      ...systemRoutes
    ]
  },
  {
    path: '/forbidden',
    name: 'forbidden',
    meta:{
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

router.beforeEach(async(to, from, next) => {
  document.title = to.meta?.title || 'Vue 3 Admin';

  const routeList = router.getRoutes();
  const routeExists = routeList.find(route => route.name === to.name);
  if (!routeExists) {
    next({ name: 'forbidden' });
    return;
  }

  const authStore = useAuthStore();
  const { token } = storeToRefs(authStore);

  if(to.meta?.requiresAuth){
    // Check if token exists
    if(!token.value){
      next({ name: 'login' });
      return;
    } else {
      // Check if user is authorized
      const authorized = true; // (Pending to implement)
      if(!authorized){
        next({ name: 'forbidden' });
        return;
      } else {  
        next();
      }
    }
  }else{ 
    if(token?.value && to.name === 'login'){
      next({ name: 'dashboard' });
      return;
    }
    next(); 
  }
});

export default router;
