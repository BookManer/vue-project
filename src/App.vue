<template>
 <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
  async created() {
    await this.$store.dispatch('channels/init');
    await this.$store.dispatch('auth/install');
  },
};
</script>
