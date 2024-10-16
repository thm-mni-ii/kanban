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
        <v-card-title> GruppeID: {{ item.group }} </v-card-title>
      </v-card>
      <div v-if="groupSelected">
        Ausgewählte Gruppe: {{ groupSelected }}
        <ul>
          <li v-for="member in selectedGroupMembers" :key="member.id">
            {{ member.first_name }} {{ member.last_name }}
          </li>
        </ul>
      </div>
      <BarChart v-if="chartData" :data="chartData" :options="chartOptions" />
    </v-container>
    <router-view v-if="!isStart"></router-view>
  </v-app>
</template>

<script>
import { getColorFromId } from "./colorHelper";
import BarChart from "./components/BarChart.vue";

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
      items: [],               // Gruppen-Items
      mockData: [],            // Dummy-Daten für Gruppenmitglieder
      groupSelected: null,     // Ausgewählte Gruppe
      selectedGroupMembers: [],// Mitglieder der ausgewählten Gruppe
      chartData: null,         // Daten für das Diagramm
      chartOptions: {          // Diagramm-Optionen
        scales: {
          y: {
            beginAtZero: true,  // Y-Achse beginnt bei 0
          },
        },
      },
    };
  },
  computed: {
    isStart() {
      return this.$route.path === "/";
    },
  },
  created() {
    // API-Daten werden geladen, sobald die Komponente erstellt wird
    this.fetchChartData();

    fetch("/groups.json")
      .then((response) => response.json())
      .then((data) => {
        this.items = data;
      });

    fetch("/MOCK_DATA.json")
      .then((response) => response.json())
      .then((data) => {
        this.mockData = data;
      });
  },

  methods: {
    selectGroup(groupId) {
      this.groupSelected = groupId;
      const group = this.items.find((item) => item.group === groupId);
      this.selectedGroupMembers = this.mockData.filter((member) =>
        group.members.includes(member.id)
      );
    },
    getColorFromId,

    onGroupCardClick(groupId) {
      this.$router.push({ name: "Boards", params: { groupId: groupId } });
    },
    async fetchChartData() {
      try {
        const response = await fetch('http://localhost:3000/stats/taskspergroup');
        if (!response.ok) {
          throw new Error('Fehler beim Abrufen der Daten');
        }
        const data = await response.json();
        this.chartData = this.formatChartData(data);  // Formatiere die Daten für das Diagramm
      } catch (error) {
        console.error(error);
      }
    },
    formatChartData(data) {
      // Daten für das Diagramm formatieren
      return {
        labels: data.map(item => `Group ${item.group_id}`),  // Verwende die group_id als Label
        datasets: [
          {
            label: 'Tasks per Group',
            data: data.map(item => item.task_count),  // Verwende task_count für die Daten
            backgroundColor: 'rgba(75, 192, 192, 0.2)',  // Balkenfarbe
            borderColor: 'rgba(75, 192, 192, 1)',       // Rahmenfarbe
            borderWidth: 1,  // Rahmendicke
          },
        ],
      };
    },

  },
};
</script>

<style scoped></style>
