<template>
  <h1 v-if="isLoading">Loading...</h1>
  <router-view v-else></router-view>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isLoading: true,
    };
  },
  async created() {
    await this.$store.dispatch('auth/install');
    this.isLoading = false;
  },
};
</script>
