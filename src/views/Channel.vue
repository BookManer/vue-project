<template>
  <AppLayout>
    <v-layout column justify-start>
      <v-flex xs4>
        <v-card>
          <strong>Name:</strong>
          <v-card-title>{{ channel.name }}</v-card-title>
          <strong>Description:</strong>
          <v-card-text>{{ channel.description }}</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </AppLayout>
</template>

<script>
import { mapGetters } from 'vuex';
import AppLayout from './layouts/AppLayout.vue';

export default {
  name: 'Channel',
  data() {
    return {
      channel: {},
    };
  },
  computed: { ...mapGetters('channels', ['channelById']) },
  created() {
    console.log(this.channelById(this.$route.params.id));
    this.channel = this.channelById(this.$route.params.id);
  },
  components: {
    AppLayout,
  },
};
</script>

<style scoped>

</style>
