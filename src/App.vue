<template>
  <h2 v-if="isLoading" class="animate">Loading</h2>
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
    await this.$store.dispatch('channels/init');
    this.isLoading = false;
  },
};
</script>

<style lang="scss">
  @keyframes load {
    0%{
      opacity: 0.08;
      filter: blur(5px);
      letter-spacing: 3px;
    }
    100%{
      opacity: 1;
      font-size: 12px;
      font-weight:600;
      filter: blur(0);
    }
  }

  .animate {
    display:flex;
    justify-content: center;
    align-items: center;
    height:100%;
    margin: auto;
    font-family: Helvetica, sans-serif, Arial;
    animation: load 1.2s infinite 0s ease-in-out;
    animation-direction: alternate;
    text-shadow: 0 0 1px white;
  }
  body, html{
    height: 96vh;
    background-color: #111;
    color: white;
  }
</style>
