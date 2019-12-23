<template>
  <AppLayout>
    <v-layout justify-center align-center column>
      <v-card class="pa-5 d-flex flex-column formSignUp" :loading="loading">
        <BaseGeneratorForm @submitForm="onSubmit($event)"
                           :schema="schema" />
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
    onSubmit(formData) {
      const { name, password, photoURL } = formData;
      this.loading = true;
      this.onUserSignUp({
        email: formData.email, name, password, fileAvatar: photoURL,
      })
        .then(() => {
          this.$router.push({ name: 'home' });
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
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

<style lang="scss">
  .formSignUp {
    min-width: 360px;
  }
</style>
