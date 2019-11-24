<template>
  <div>
    <v-toolbar>
      <v-toolbar-title>My project</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text>Profile</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-app>
      <slot></slot>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'AppLayout',
};
</script>

<style scoped>

</style>
