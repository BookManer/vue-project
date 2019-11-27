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
    async onUserSignIn({ commit }, userFormData) {
      const { login, password } = userFormData;
      console.log(userFormData);
      const res = fbAuth.signInWithEmailAndPassword(login, password);
      res.then(({ user }) => {
        commit('UPDATE_USER', { id: user.uid, ...userFormData });
      });

      return res;
    },
    onUserSignOut() {
      return fbAuth.signOut();
    },
  },
};
