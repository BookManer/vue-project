<template>
  <div>
    <v-menu close-on-click
            close-on-content-click
            offset-y>
      <template v-slot:activator="{ on }">
        <div class="user-toolbar" v-on="on">
          <img v-if="user.photoURL && isAuth"
               class="user-toolbar__avatar-icon"
               :src="user.photoURL"
               :alt="user.displayName" />
          <v-icon v-else> fas fa-user-circle</v-icon>
          <v-icon class="user-toolbar__caret-down" size="16">fas fa-caret-down</v-icon>
        </div>
      </template>
      <v-card flat class="px-5">
        <v-list-item-content>
          <v-list-item-title class="title">Меню</v-list-item-title>
          <v-list-item-subtitle v-if="isAuth">{{ user.displayName }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-divider></v-divider>
        <v-list>
          <v-item>
            <v-layout class="flex-row mb-2">
              <v-icon size="16" color="blue">fas fa-home</v-icon>
              <span class="ml-2">
                <router-link to="/" class="black--text">Главная</router-link>
              </span>
            </v-layout>
          </v-item>
          <v-divider></v-divider>
          <div v-if="isAuth">
            <v-item v-for="(item, index) in menuItems" :key="index">
              <router-link :to="{ name: item.routeName, params: { id: user.uid } }">
                <v-layout class="flex-row mt-2">
                  <v-icon size="16" color="blue">{{ item.faIcon }}</v-icon>
                  <span class="ml-2 subtitle-1 black--text">
                    {{ item.name }}
                  </span>
                </v-layout>
              </router-link>
            </v-item>
          </div>
          <v-divider v-if="isAuth" class="my-2"></v-divider>
          <v-item>
            <v-list-item-group v-if="isAuth">
              <v-icon size="16" color="blue">fas fa-sign-out-alt</v-icon>
              <span @click="handleSignOut" class="ml-2 black--text">Выйти</span>
            </v-list-item-group>
            <v-list-item-group v-else>
              <v-layout class="flex-row mt-2">
                <v-icon size="16" color="blue">fas fa-user-plus</v-icon>
                <router-link to="signUp" class="ml-2 black--text">Зарегистрироваться</router-link>
              </v-layout>
              <v-layout class="flex-row mt-2">
                <v-icon size="16" color="blue">fas fa-sign-in-alt</v-icon>
                <router-link to="signIn" class="ml-2 black--text">Войти</router-link>
              </v-layout>
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
          routeName: route.name,
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

<style lang="sass">
  a
    text-decoration: none

  .user-toolbar
    display: flex
    flex-flow: row nowrap
    cursor: pointer

    &:hover &__caret-down
      opacity: 0.5

    &__avatar-icon
      width: 2rem
      height: 2rem
      object-fit: contain
      border-radius: 50%

</style>
