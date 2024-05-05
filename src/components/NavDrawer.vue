<template>
  <v-navigation-drawer expand-on-hover rail>
    <v-list>
      <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg" subtitle="sandra_a88@gmailcom"
        title="Sandra Adams"></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-folder" title="Meine Boards" value="myfiles"></v-list-item>
      <v-list-item prepend-icon="mdi-account-multiple" title="Meine Gruppe" value="shared"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>