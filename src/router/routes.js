import Home from '../views/Home.vue';
import Channel from '../views/Channel.vue';
import SignIn from '../views/SignIn.vue';
import SignUp from '../views/SignUp.vue';
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
    path: '/profile/:id',
    name: 'profile',
    component: UserProfile,
    meta: {
      requiredAuth: true,
      appMenu: {
        name: 'Профиль',
        faIcon: 'fas fa-user',
      },
    },
  },
  {
    path: '/signIn',
    name: 'signIn',
    component: SignIn,
  },
  {
    path: '/signUp',
    name: 'signUp',
    component: SignUp,
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
