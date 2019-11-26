import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import Home from '../views/Home.vue';
import Channel from '../views/Channel.vue';
import SignIn from '../views/SignIn.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/signIn',
    name: 'signIn',
    component: SignIn,
  },
  {
    path: '/channel/:id',
    name: 'channel',
    component: Channel,
    meta: {
      requiredAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeResolve((to, from, next) => {
  if (to.meta.requiredAuth && store.getters['auth/isAuth']) {
    next({
      path: '/signIn',
      query: to.path,
    });
    return;
  }
  next();
});

export default router;
