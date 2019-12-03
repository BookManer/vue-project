import Vue from 'vue';
import { firestorePlugin } from 'vuefire';
import vueValidate from 'vuelidate';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import tErrors from './filters/t_errors';


Vue.filter('t_errors', tErrors);
Vue.use(firestorePlugin);
Vue.use(vueValidate);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
