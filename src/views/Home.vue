<template>
  <AppLayout>
    <v-layout column justify-center align-center>
      <h1>Home</h1>
<!--      <v-card width="320px" class="mb-5" v-for="channel in channels" :key="channel.id">-->
<!--        <v-card-title>-->
<!--          <router-link :to="'/channel/' + channel.id">{{ channel.name }}</router-link>-->
<!--        </v-card-title>-->
<!--        <v-card-text>{{ channel.description }}</v-card-text>-->
<!--      </v-card>-->
    </v-layout>
  </AppLayout>
</template>

<script>
import { mapState } from 'vuex';
import AppLayout from './layouts/AppLayout.vue';

export default {
  name: 'home',
  created() {
    // if (!this.$store.getters['channels/hasChannels']) {
    //   this.$store.dispatch('channels/init');
    // }
  },
  computed: {
    ...mapState('channels', ['channels']),
  },
  components: { AppLayout },
};
</script>
