<template>
  <AppLayout>
    <v-layout justify-center align-center column>
      <v-card class="pa-5 d-flex flex-column" :loading="loading">
        <BaseGeneratorForm @submit="onSubmit"
                           v-model="formData"
                           :schema="schema"
                           type="formSignUp" />
      </v-card>
      <v-card dark v-if="error" color="error">
        <v-card-text>{{ error | t_errors }}</v-card-text>
      </v-card>
    </v-layout>
  </AppLayout>
</template>

<script>
import { mapActions } from 'vuex';
import AppLayout from './layouts/AppLayout.vue';
import BaseGeneratorForm from '../components/base/BaseGeneratorForm.vue';
import schemas from '../configs/schemas';

export default {
  name: 'SignOut',
  data() {
    return {
      loading: false,
      formData: null,
      schema: schemas.forms.formSignUp,
      error: '',
    };
  },
  mounted() {
    console.log(this.validFIO);
  },
  methods: {
    ...mapActions('auth', ['onUserSignUp']),
    async onSubmit() {
      const { mEmail, name, password } = this;
      this.loading = true;
      this.onUserSignUp({ email: mEmail, name, password })
        .then(() => {
          this.$router.push({ name: 'home' });
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          this.error = err.code;
          setTimeout(() => { this.error = ''; }, 1500);
        });
    },
  },
  components: {
    BaseGeneratorForm,
    AppLayout,
  },
};
</script>

<style scoped>

</style>
