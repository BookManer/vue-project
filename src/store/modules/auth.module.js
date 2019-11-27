import fb from '../../db';

const fbAuth = fb.auth();

export default {
  namespaced: true,
  state: {
    user: {},
  },
  getters: {
    isAuth: state => state.user.email !== undefined,
  },
  mutations: {
    UPDATE_USER(state, data) {
      state.user = { ...state.user, ...data };
    },
  },
  actions: {
    install({ commit, getters }) {
      fbAuth.onAuthStateChanged((user) => {
        if (!getters.isAuth) {
          commit('UPDATE_USER', user);
        }

        return user;
      });
    },
    async onUserSignIn({ commit }, userFormData) {
      const { login, password } = userFormData;
      console.log(userFormData);
      const user = await fbAuth.signInWithEmailAndPassword(login, password);
      commit('UPDATE_USER', { ...userFormData });

      return user;
    },
    async onUserSignOut({ commit }) {
      await fbAuth.signOut();
      commit('UPDATE_USER', null);
    },
  },
};
