<template>
  <AppLayout>
    <v-layout>
      <v-flex xs4>
        <v-layout justify-center
                  align-start
                  column
                  class="pa-5">
          <v-card outlined class="pa-4">
            <v-img :src="user.photoURL"></v-img>
            <h2 class="mt-4">{{ user.displayName }}</h2>
            <p>{{ user.email }}</p>
            <v-btn color="primary">Редактировать</v-btn>
          </v-card>
        </v-layout>
      </v-flex>
      <v-flex xs8>
        <v-layout align-start
                  class="pa-5">
          <BaseGeneratorForm @submitForm="onVerifyChanges($event)"
                             :schema="schema" />
        </v-layout>
      </v-flex>
    </v-layout>
  </AppLayout>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import BaseGeneratorForm from '../../components/base/BaseGeneratorForm.vue';
import AppLayout from '../layouts/AppLayout.vue';

import schemas from '../../configs/schemas';

export default {
  name: 'UserProfile',
  data() {
    return {
      schema: schemas.forms.formEditProfile,
    };
  },
  computed: {
    ...mapState('auth', ['user']),
  },
  methods: {
    ...mapActions('auth', ['updateUser']),
    async onVerifyChanges(payload) {
      const { displayName, email, aboutMe } = payload;
      await this.updateUser({ displayName, email, aboutMe });
    },
  },
  components: { AppLayout, BaseGeneratorForm },
};
</script>

<style scoped>

</style>
