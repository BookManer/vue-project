import Vue from 'vue';
import Vuex from 'vuex';
import fb from '../db';
// Modules
import channels from './modules/chanels.module';
import auth from './modules/auth.module';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    db: fb.firestore(),
  },
  modules: {
    channels,
    auth,
  },
});
