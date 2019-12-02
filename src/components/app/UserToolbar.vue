<template>
  <div>
    <v-icon v-if="isAuth"> fas fa-user-circle</v-icon>
    <v-icon></v-icon>
    <v-menu close-on-click
            close-on-content-click
            offset-y>
      <template v-slot:activator="{ on }">
        <v-icon v-on="on" size="16">fas fa-caret-down</v-icon>
      </template>
      <v-card flat class="px-5">
        <v-list-item-content>
          <v-list-item-title class="title">Меню</v-list-item-title>
          <v-list-item-subtitle>Ноготков Андрей</v-list-item-subtitle>
        </v-list-item-content>
        <v-divider></v-divider>
        <v-list>
          <v-item v-for="(item, index) in menuItems" :key="index">
            <router-link :to="item.path">
              <v-layout class="flex-row">
                <v-icon size="16" color="blue">{{ item.faIcon }}</v-icon>
                <v-list-item-title class="ml-2 subtitle-1 black--text">
                  {{ item.name }}
                </v-list-item-title>
              </v-layout>
            </router-link>
          </v-item>
          <v-divider class="my-2"></v-divider>
          <v-item>
            <v-list-item-group v-if="isAuth">
              <v-icon size="16" color="blue">fas fa-sign-out-alt</v-icon>
              <v-list-item-text @click="handleSignOut" class="ml-2 black--text">
                Выйти
              </v-list-item-text>
            </v-list-item-group>
            <v-list-item-group v-else>
              <v-list-item-title>
                <v-icon size="16" color="blue">fas fa-user-plus</v-icon>
                <router-link to="signUp" class="ml-2 black--text">Зарегистрироваться</router-link>
              </v-list-item-title>
              <v-list-item-title>
                <v-icon size="16" color="blue">fas fa-sign-in-alt</v-icon>
                <router-link to="signIn" class="ml-2 black--text">Войти</router-link>
              </v-list-item-title>
            </v-list-item-group>
          </v-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import routes from '../../router/routes';

export default {
  name: 'UserToolbar',
  data() {
    return {
      menuItems: [],
    };
  },
  mounted() {
    this.menuItems = routes
      .filter(route => (route.meta && ('appMenu' in route.meta)))
      .map(route => (
        {
          name: route.meta.appMenu.name,
          faIcon: route.meta.appMenu.faIcon,
          path: route.path,
        }
      ));
  },
  computed: {
    ...mapState('auth', ['user']),
    ...mapGetters('auth', ['isAuth']),
    iconProfile() {
      if (this.isAuth) {
        return this.user.photoURL ? this.user.photoURL : '';
      }

      return '';
    },
  },
  methods: {
    async handleSignOut() {
      await this.$store.dispatch('auth/onUserSignOut');
      await this.$router.push({ name: 'signIn' });
    },
  },
};
</script>

<style lang="scss">
  a {
    text-decoration: none;
  }
</style>
