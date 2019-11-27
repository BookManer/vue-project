import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import store from '../store';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiredAuth) {
    setTimeout(async () => {
      const isAuth = store.getters['auth/isAuth'];
      if (!isAuth) {
        await router.push({ path: '/signIn', query: { redirect: to.fullPath } });
        return;
      }

      next();
    }, 2000);
  }
  next();
});

export default router;
