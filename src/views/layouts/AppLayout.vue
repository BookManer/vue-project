<template>
  <div>
    <v-toolbar>
      <router-link to="/">My project</router-link>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text @click="onGoProfile">Profile</v-btn>
        <v-btn v-if="!isAuth()" text><router-link to="/signIn">Sign In</router-link></v-btn>
        <v-btn v-if="!isAuth()" text>Sign Up</v-btn>
        <v-btn v-if="isAuth()" @click="onSignOut">Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-app>
      <slot></slot>
    </v-app>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'AppLayout',
  computed: {
    ...mapState('auth', ['user']),
  },
  methods: {
    ...mapGetters('auth', ['isAuth']),
    async onSignOut() {
      await this.$store.dispatch('auth/onUserSignOut');
      await this.$router.push({ path: '/signIn' });
    },
    async onGoProfile() {
      await this.$router.push({ path: '/profile', params: { id: this.user.id } });
    },
  },
};
</script>

<style scoped>

</style>
