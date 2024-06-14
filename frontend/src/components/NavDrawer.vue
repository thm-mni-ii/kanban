<template>
  <v-navigation-drawer expand-on-hover rail style="background-color: #405E9A;">
    <v-list>
      <v-list-item prepend-avatar="https://cdn.vuetifyjs.com/images/lists/1.jpg" subtitle="michel@gmailcom"
        title="Max Michel"></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-folder" @click="gotoBoards" title="Meine Boards" value="myfiles"></v-list-item>
      <v-list-item prepend-icon="mdi-account-multiple" title="Meine Gruppe" value="shared"></v-list-item>
      <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  methods: {
    gotoBoards() {
      this.$router.push({ name: 'Boards' });
    },
  }
}
</script>