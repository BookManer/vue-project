import fb from '../db';
import store from '../store/index';

const fbAuth = fb.auth();

fbAuth.onAuthStateChanged((currentUser) => {
  store.commit('auth/UPDATE_USER', currentUser);
  store.commit('auth/UPDATE_IS_AUTHORIZED', !!currentUser);
});

export default () => new Promise((resolve) => {
  setTimeout(() => {
    if (store.getters['auth/isAuth']) {
      resolve(store.getters['auth/isAuth']);
    }
  }, 2500);
});
