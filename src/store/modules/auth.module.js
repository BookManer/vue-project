import fb from '../../db';

const fbAuth = fb.auth();

export default {
  namespaced: true,
  state: {
    user: null,
  },
  getters: {
    isAuth: state => (state.user !== null),
  },
  mutations: {
    UPDATE_USER(state, data) {
      state.user = { ...state.user, ...data };
    },
  },
  actions: {
    install({ commit, getters }) {
      fbAuth.onAuthStateChanged((user) => {
        if (!getters.isAuthired) {
          commit('UPDATE_USER', user);
        }
      });
    },
    onUserSignIn(userFormData) {
      const { login, password } = userFormData;
      return fbAuth.signInWithEmailAndPassword(login, password);
    },
    onUserSignOut() {
      return fbAuth.signOut();
    },
  },
};
