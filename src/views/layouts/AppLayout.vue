<template>
  <div>
    <v-toolbar>
      <router-link to="/">My project</router-link>
      <v-spacer></v-spacer>
      <UserToolbar />
    </v-toolbar>
    <v-app>
      <slot></slot>
    </v-app>
  </div>
</template>

<script>
import UserToolbar from '../../components/app/UserToolbar.vue';

export default {
  name: 'AppLayout',
  components: {
    UserToolbar,
  },
};
</script>

<style scoped>

</style>
