<template>
  <v-app>
    <v-container v-if="isStart">
      <v-container class="d-flex justify-center my-container mb-4" style="background-color:  #80BA27;" w-auto>
        <h1>Meine Gruppen</h1>
      </v-container>
      <v-card
        v-for="(item, index) in items"
        :key="index"
        class="mb-4"
        :style="{ backgroundColor: getColorFromId(item.group) }"
        @click="onGroupCardClick(item.group)"
      >
        <v-card-title> GruppeID: {{ item.group }} </v-card-title>
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
import BarChart from "./components/BarChart.vue";
import { GroupService } from "@/lib/group.service";

// Ich war nicht in der Lage herauszufinden, was man machen muss, damit man die Variable im Template benutzen kann
const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export default {
  components: { BarChart },

  data() {
    return {
      items: [],
    };
  },
  computed: {
    isStart() {
      return this.$route.path === "/";
    },
  },
  async created() {
    try {
      const groups = await GroupService.getMyGroups();
      this.items = groups.map(group => ({ group: group.id }));
    } catch (error) {
      console.error('Fehler beim Laden der Gruppen:', error);
    }
  },
  methods: {
    getColorFromId,

    onGroupCardClick(groupId) {
      this.$router.push({ name: "Boards", params: { groupId: groupId } });
    },

    goToStatistics() {
      this.$router.push({name: "Statistics"});
    },
  },
};
</script>

<style scoped></style>
