import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import store from '../store';
import fb from '../db';

const fbAuth = fb.auth();
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  try {
    if (to.meta.requiredAuth && to.name !== 'signIn') {
      fbAuth.onAuthStateChanged((currentUser) => {
        const isAuth = !!currentUser;
        if (!isAuth) {
          next({
            path: '/signIn',
            query: { redirect: to.fullPath },
          });
        } else {
          next();
        }

        store.commit('auth/UPDATE_USER', currentUser);
        store.commit('auth/UPDATE_IS_AUTHORIZED', !!currentUser);
      });
    }
    next();
  } catch (err) {
    console.error(err);
  }
});

export default router;
