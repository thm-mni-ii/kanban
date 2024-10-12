<template>
  <v-navigation-drawer expand-on-hover rail style="background-color: #405E9A;">

    
    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-folder" @click="gotoBoards" title="Meine Boards" value="myfiles"></v-list-item>
      <v-list-item prepend-icon="mdi-account-multiple" title="Meine Gruppe" value="shared"></v-list-item>
      <v-list-item prepend-icon="mdi-home" @click="goToHome"title="Home" value="starred"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import {useRoute, useRouter} from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();

    function gotoBoards() {
      router.push({ name: 'Boards' });
    }

    function passRouter() {
      return route.params.groupId;
    }

    function goToHome() {
      router.push({ name: 'Start' });
    }

    return {
      gotoBoards,
      passRouter,
      goToHome,
    };
  },
};
</script>
