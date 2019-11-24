import Vue from 'vue';
import Vuex from 'vuex';
// Modules
import channels from './modules/chanels.module';
import users from './modules/users.module';
// Firebase Real Time Database
import db from '../db';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    db,
  },
  modules: {
    channels,
    users,
  },
});
