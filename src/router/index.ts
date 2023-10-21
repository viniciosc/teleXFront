import { createRouter, createWebHistory } from 'vue-router';
import EnviadasPage from '../views/EnviadasPage.vue';
import RecebidasPage from '../views/RecebidasPage.vue';
import LoginPageVue from '../views/LoginPage.vue';
import NotFoundPage from '../views/NotFoundPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginPageVue,
    },
    {
      path: '/home',
      name: 'home',
      component: EnviadasPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/recebidas',
      name: 'recebidas',
      component: RecebidasPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundPage,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!localStorage.getItem('token')) {
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
