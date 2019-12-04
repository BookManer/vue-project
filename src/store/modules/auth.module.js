import fb from '../../db';

const fbAuth = fb.auth();

export default {
  namespaced: true,
  state: {
    user: {},
    isAuthorized: false,
  },
  getters: {
    isAuth: state => state.isAuthorized,
  },
  mutations: {
    UPDATE_USER(state, data) {
      state.user = { ...state.user, ...data };
    },
    UPDATE_IS_AUTHORIZED(state, isAuth) {
      state.isAuthorized = isAuth;
    },
  },
  actions: {
    async onUserSignIn({ commit }, userFormData) {
      const { login, password } = userFormData;

      const user = await fbAuth.signInWithEmailAndPassword(login, password);
      commit('UPDATE_USER', { ...userFormData });

      return user;
    },
    async onUserSignUp({ commit }, userFormData) {
      const { email, name, password } = userFormData;
      await fbAuth.createUserWithEmailAndPassword(email, password);
      fbAuth.displayName = name;
      commit('UPDATE_USER', { displayName: name });
    },
    async onUserSignOut({ commit }) {
      await fbAuth.signOut();
      commit('UPDATE_USER', null);
    },
  },
};
