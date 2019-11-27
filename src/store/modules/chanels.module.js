import uuid4 from 'uuid/v5';

export default {
  namespaced: true,
  state: {
    channels: [],
  },
  getters: {
    hasChannels: state => state.channels.length !== 0,
    channelById: state => id => state.channels.filter(channel => channel.id === id)[0],
    searchChannel(state, query) {
      return state.channels.filter(({ name }) => (
        RegExp(query).test(name)
      ));
    },
  },
  mutations: {
    ADD_CHANNEL(state, payload) {
      state.channels.push(payload);
    },
    REMOVE_CHANNEL(state, removeId) {
      state.channels = state.channels.filter(({ id }) => (id !== removeId));
    },
    UPDATE_CHANNEL(state, payload) {
      const { id, setting } = payload;
      state.channels[id] = { ...state.channels[id], ...setting };
    },
  },
  actions: {
    async init({ commit, rootState }) {
      const channels = await rootState.db
        .collection('channels')
        .get()
        .then(querySnapshot => querySnapshot.docs);

      channels.forEach((channel) => {
        const payload = channel.data();
        commit('ADD_CHANNEL', payload);
      });
    },
    async addChannel({ commit, rootState }, payload) {
      await rootState.db
        .collection('channels')
        .doc(payload.name)
        .set({ id: uuid4(), ...payload });

      commit('ADD_CHANNEL', payload);
    },
  },
};
