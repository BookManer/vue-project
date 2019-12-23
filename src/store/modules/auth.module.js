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
    async onUserSignUp({ commit, rootState }, userFormData) {
      const {
        email, name, password, fileAvatar,
      } = userFormData;
      await rootState.firestore.storage().ref(`/images/${fileAvatar.name}`).put(fileAvatar);
      await fbAuth.createUserWithEmailAndPassword(email, password);
      const photoURL = await rootState.firestore.storage().ref(`/images/${fileAvatar.name}`).getDownloadURL();
      await fbAuth.currentUser.updateProfile({
        displayName: name,
        photoURL,
      });

      commit('UPDATE_USER', fbAuth.currentUser);
    },
    async onUserSignOut({ commit }) {
      await fbAuth.signOut();
      commit('UPDATE_USER', null);
    },
    async updateUser({ commit }, payload) {
      await fbAuth.currentUser.updateProfile(payload);
      commit('UPDATE_USER', payload);
    },
  },
};
