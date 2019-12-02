<template>
  <AppLayout>
    <v-layout justify-center align-center column>
      <v-card class="pa-5 d-flex flex-column" :loading="loading">
        <form @submit.prevent="onSubmit">
          <v-text-field v-model="login" type="email" label="Login"></v-text-field>
          <v-text-field v-model="password" type="password" label="Password"></v-text-field>
          <v-btn type="submit" class="primary mt-4 d-block ml-auto mr-auto">Войти</v-btn>
        </form>
      </v-card>
      <v-card dark v-if="error" color="error">
        <v-card-text>{{ error | t_errors }}</v-card-text>
      </v-card>
    </v-layout>
  </AppLayout>
</template>

<script>
// import urldecode from 'urldecode';
import store from '../store';
import AppLayout from './layouts/AppLayout.vue';

export default {
  name: 'SignIn',
  data() {
    return {
      loading: false,
      error: null,
      login: '',
      password: '',
    };
  },
  methods: {
    async onSubmit() {
      try {
        const { login, password } = this;
        this.loading = true;

        await store.dispatch('auth/onUserSignIn', { login, password });
        const path = 'redirect' in this.$route.query ? this.$route.query.redirect : '/';
        await this.$router.push({ path });

        this.loading = false;
      } catch (err) {
        this.error = err.code;
        this.loading = false;
        setTimeout(() => { this.error = null; }, 3000);
      }
    },
  },
  components: {
    AppLayout,
  },
};
</script>

<style scoped>

</style>
