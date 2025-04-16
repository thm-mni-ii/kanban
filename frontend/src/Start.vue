<template>
  <v-app>
    <v-container v-if="isStart">
      <v-card
          v-for="(item, index) in items"
          :key="index"
          class="mb-4"
          :style="{ backgroundColor: getColorFromId(item.group) }"
          @click="onGroupCardClick(item.group)"
      >
        <v-card-title>GruppeID: {{ item.group }}</v-card-title>
      </v-card>

      <v-container>
        <v-btn color="primary" @click="goToStatistics">Zu den Statistiken</v-btn>
      </v-container>
    </v-container>

    <router-view v-if="!isStart"></router-view>
  </v-app>
</template>

<script>
import { getColorFromId } from "./colorHelper";

export default {
  data() {
    return {
      items: []
    };
  },
  computed: {
    isStart() {
      return this.$route.path === "/";
    }
  },
  created() {
    fetch("/groups.json")
        .then((response) => response.json())
        .then((data) => {
          this.items = data;
        });
  },
  methods: {
    getColorFromId,

    onGroupCardClick(groupId) {
      this.$router.push({name: "Boards", params: {groupId}});
    },

    goToStatistics() {
      this.$router.push({name: "Statistics"});
    }
  }
};
</script>

<style scoped></style>
