<template>
  <v-navigation-drawer app>
    <v-list dense>
      <v-list-item>
        <v-list-item-avatar>
          <img src="https://th.bing.com/th/id/R.a1371ba2e9ac32353c33db97ccfb21a5?rik=uQ%2fPQVU2%2f5KTog&pid=ImgRaw&r=0" alt="User Avatar">
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>Max Michel</v-list-item-title>
          <v-list-item-subtitle>michel@gmail.com</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item-group>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-folder</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Meine Boards</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="$emit('open-dialog')">
          <v-list-item-icon>
            <v-icon>mdi-account-group</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Meine Gruppe</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-star</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Starred</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'NavDrawer',
  methods: {
    openDialog() {
      this.$emit('open-dialog');
    }
  }
};
</script>

<style scoped>
.v-list-item-avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.v-list-item {
  cursor: pointer;
}
</style>