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
      <!-- Diagramm für Tasks per Group -->
      <BarChart v-if="chartData" :data="chartData" :options="chartOptions" />
      <!-- Diagramm für Tasks Done in Percent -->
      <BarChart v-if="donePercentChartData" :data="donePercentChartData" :options="chartOptions" />
      <!-- Diagramm für Tasks per Label -->
      <BarChart v-if="taskPerLabelChartData" :data="taskPerLabelChartData" :options="chartOptions" />
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
      donePercentChartData: null,     // Daten für das "Done Percent"-Diagramm
      taskPerLabelChartData: null,    // Daten für das "Tasks per Label"-Diagramm
      items: [],                      // Gruppen-Items
      mockData: [],                   // Dummy-Daten für Gruppenmitglieder
      groupSelected: null,            // Ausgewählte Gruppe
      selectedGroupMembers: [],       // Mitglieder der ausgewählten Gruppe
      chartData: null,                // Daten für das Diagramm
      chartOptions: {                 // Diagramm-Optionen
        scales: {
          y: {
            beginAtZero: true,        // Y-Achse beginnt bei 0
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
    this.fetchChartData(); // API-Abfrage für "Tasks per Group"
    this.fetchDonePercentData();  // API-Abfrage für "Tasks Done in Percent"
    this.fetchTaskDataPerLabel();  // API-Abfrage für "Tasks per Label"

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
      this.$router.push({name: "Boards", params: {groupId: groupId}});
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

    async fetchDonePercentData() {
      try {
        const response = await fetch('http://localhost:3000/stats/tasks/done/in/percent');
        if (!response.ok) {
          throw new Error('Fehler beim Abrufen der Daten');
        }
        const data = await response.json();

        // Überprüfe, ob die Daten korrekt geladen wurden
        console.log("Rohdaten von der Done Percent API:", data);

        // Prüfe, ob die Antwort ein Array ist, ansonsten setze ein leeres Array
        const dataArray = Array.isArray(data) ? data : [];

        // Wenn es gültige Daten gibt, formatiere sie und weise sie der Chart-Variable zu
        if (dataArray.length > 0) {
          this.donePercentChartData = this.formatDonePercentData(dataArray);  // Formatiere die echten Daten
        } else {
          console.warn("Keine gültigen Daten erhalten.");
        }

        // Gib die formatierten Diagrammdaten in der Konsole aus
        console.log("Formatiertes Done Percent Chart Data:", this.donePercentChartData);
      } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
      }
    },

// Formatierungsfunktion, um die Daten in ein Chart.js-kompatibles Format umzuwandeln
    formatDonePercentData(data) {
      return {
        labels: data.map(item => `Group ${item.group_id}`),  // Verwende die group_id als Label
        datasets: [
          {
            label: 'Tasks Done in Percent',
            data: data.map(item => parseFloat(item.percent_tasks_done)),  // Konvertiere Strings zu Zahlen
            backgroundColor: 'rgba(54, 162, 235, 0.2)',  // Balkenfarbe
            borderColor: 'rgba(54, 162, 235, 1)',        // Rahmenfarbe
            borderWidth: 1,  // Rahmendicke
          },
        ],
      };
    },

/**
 * Benutzbar erst sobald es Daten für diese Tabelle gibt
    // Methode zum Abrufen der Daten pro Label
    async fetchTaskDataPerLabel() {
      try {
        const response = await fetch('http://localhost:3000/stats/tasks/per/label');

        if (!response.ok) {
          throw new Error('Fehler beim Abrufen der Daten');
        }

        const data = await response.json();

        // Überprüfe, ob die Daten korrekt geladen wurden
        console.log("Rohdaten von der Label-API:", data);

        // Prüfe, ob die Antwort ein Array ist, ansonsten setze ein leeres Array
        const dataArray = Array.isArray(data) ? data : [];

        // Wenn es gültige Daten gibt, formatiere sie und weise sie der Chart-Variable zu
        if (dataArray.length > 0) {
          this.taskPerLabelChartData = this.formatTaskDataPerLabel(dataArray);  // Formatiere die echten Daten
        } else {
          console.warn("Keine gültigen Daten erhalten.");
        }

        // Gib die formatierten Diagrammdaten in der Konsole aus
        console.log("Formatiertes Task per Label Chart Data:", this.taskPerLabelChartData);

      } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
      }
    },

// Formatierungsfunktion für Task-Daten pro Label
    formatTaskDataPerLabel(data) {
      return {
        labels: data.map(item => item.label_name),  // Verwende die label_name als Label
        datasets: [
          {
            label: 'Tasks per Label',
            data: data.map(item => item.task_count),  // Verwende task_count für die Daten
            backgroundColor: 'rgba(255, 159, 64, 0.2)',  // Balkenfarbe
            borderColor: 'rgba(255, 159, 64, 1)',        // Rahmenfarbe
            borderWidth: 1,  // Rahmendicke
          },
        ],
      };
    },
**/

  },
};
</script>

<style scoped></style>
