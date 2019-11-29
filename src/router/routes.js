import Home from '../views/Home.vue';
import Channel from '../views/Channel.vue';
import SignIn from '../views/SignIn.vue';
// user
import UserProfile from '../views/user/UserProfile.vue';

export default [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requiredAuth: true,
    },
  },
  {
    path: '/signIn',
    name: 'signIn',
    component: SignIn,
    meta: {
      requiredAuth: false,
    },
  },
  {
    path: '/channel/:id',
    name: 'channel',
    component: Channel,
    meta: {
      requiredAuth: true,
    },
  },
  {
    path: '/profile/:id',
    name: 'profile',
    component: UserProfile,
    meta: {
      requiredAuth: true,
    },
  },
];
