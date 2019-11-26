<template>
  <AppLayout>
    <form @click.prevent="onSubmit">
      <v-text-field type="text" label="Login"></v-text-field>
      <v-text-field type="password" label="Password"></v-text-field>
    </form>
  </AppLayout>
</template>

<script>
import AppLayout from './layouts/AppLayout.vue';

export default {
  name: 'SignIn',
  components: {
    AppLayout,
  },
};
</script>

<style scoped>

</style>
