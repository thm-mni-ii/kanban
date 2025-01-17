<template>
  <v-app>
    <v-container>
      <h1>Statistiken</h1>

      <!-- Dropdown zur Gruppenauswahl -->
      <v-select
          v-model="selectedGroup"
          :items="groupOptions"
          label="Gruppe auswählen"
      />

      <!-- Diagramme für alle Gruppen -->
      <BarChart v-if="chartData" :data="chartData" :options="chartOptions" />
      <BarChart v-if="donePercentChartData" :data="donePercentChartData" :options="chartOptions" />
      <BarChart v-if="taskPerLabelChartData" :data="taskPerLabelChartData" :options="chartOptions" />
      <BarChart v-if="tasksByMemberChartData" :data="tasksByMemberChartData" :options="chartOptions" />
      <div v-if="latestDoneTask">
        <h2>Zuletzt erledigte Aufgabe:</h2>
        <p><strong>Task id</strong> {{ latestDoneTask.kantask_id }}</p>
        <p><strong>Name:</strong> {{ latestDoneTask.name }}</p>
        <p><strong>Beschreibung:</strong> {{ latestDoneTask.description }}</p>
        <p><strong>Fälligkeitsdatum:</strong> {{ latestDoneTask.due_date }}</p>
        <p><strong>Erledigt am:</strong> {{ latestDoneTask.done_time }}</p>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import BarChart from "./components/BarChart.vue";

export default {
  components: { BarChart },

  data() {
    return {
      selectedGroup: 'all',
      groupOptions: ['all'],
      chartData: null,
      donePercentChartData: null,
      taskPerLabelChartData: null,
      latestDoneTask: null,
      tasksByMemberChartData: null,
      chartOptions: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Completed Tasks'
            }
          },
          x: {
            title: {
              display: true
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'end',
            labels: {
              usePointStyle: true
            }
          }
        }
      }
    };
  },

  watch: {
    selectedGroup(newVal, oldVal) {
      console.log("Gruppe geändert von:", oldVal, "zu:", newVal);
      this.fetchDonePercentData(); // Diagrammdaten neu abrufen
      console.log("Aktuelle Daten für donePercentChartData:", this.donePercentChartData);
    },
  },

  methods: {
    async fetchGroups() {
      try {
        const response = await fetch('http://localhost:3000/stats/taskspergroup');
        const data = await response.json();
        this.groupOptions = ['all', ...data.map(group => group.group_id)];
      } catch (error) {
        console.error('Fehler beim Abrufen der Gruppen:', error);
      }
    },

    async fetchAllStatistics() {
      try {
        const response = await fetch('http://localhost:3000/stats/taskspergroup');
        const data = await response.json();
        this.chartData = this.formatChartData(data);
        this.fetchDonePercentData();
        this.fetchTaskDataPerLabel();
        this.fetchTasksByMember();
        this.fetchLatestDoneTask();
      } catch (error) {
        console.error('Fehler beim Abrufen aller Statistiken:', error);
      }
    },

    formatChartData(data) {
      return {
        labels: data.map(item => `Group ${item.group_id}`),
        datasets: [
          {
            label: 'Tasks per Group',
            data: data.map(item => item.task_count),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      };
    },

    async fetchDonePercentData() {
      try {
        const response = await fetch('http://localhost:3000/stats/tasks/done/in/percent');
        const data = await response.json();

        // Filtere die Daten basierend auf der Auswahl
        const filteredData = this.selectedGroup === "all"
            ? data // Alle Daten anzeigen
            : data.filter(item => item.group_id === parseInt(this.selectedGroup)); // Nach Gruppe filtern

        this.donePercentChartData = this.formatDonePercentData(filteredData);
      } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
      }
    },


    formatDonePercentData(data) {
      return {
        labels: data.map(item => `Group ${item.group_id}`),
        datasets: [
          {
            label: 'Tasks done in percent',
            data: data.map(item => parseFloat(item.percent_tasks_done)),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }
        ]
      };
    },

    async fetchTaskDataPerLabel() {
      try {
        const response = await fetch('http://localhost:3000/stats/tasks/per/label');
        const data = await response.json();
        this.taskPerLabelChartData = this.formatTaskDataPerLabel(data);
      } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
      }
    },

    formatTaskDataPerLabel(data) {
      return {
        labels: data.map(item => item.label_name),
        datasets: [
          {
            label: 'Tasks per label',
            data: data.map(item => item.task_count),
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1
          }
        ]
      };
    },

    async fetchTasksByMember() {
      try {
        const response = await fetch('http://localhost:3000/stats/tasks/by/member');
        const data = await response.json();
        this.tasksByMemberChartData = this.formatTasksByMemberData(data);
      } catch (error) {
        console.error('Fehler beim Abrufen der Tasks by Member:', error);
      }
    },

    formatTasksByMemberData(data) {
      const groupedData = data.reduce((acc, item) => {
        const groupId = item.group_id;
        if (!acc[groupId]) acc[groupId] = [];
        acc[groupId].push({ date: item.day, task_count: item.completed_tasks });
        return acc;
      }, {});

      const labels = [...new Set(data.map(item => item.day))].sort();

      const datasets = Object.keys(groupedData).map((groupId, index) => {
        const color = `hsl(${(index * 65) % 360}, 70%, 50%)`;
        return {
          label: `Group ${groupId}`,
          data: labels.map(labelDate => {
            const dataPoint = groupedData[groupId].find(point => point.date === labelDate);
            return dataPoint ? dataPoint.task_count : 0;
          }),
          borderColor: color,
          backgroundColor: color,
          fill: false,
          tension: 0.1,
          pointRadius: 4,
          pointHoverRadius: 6
        };
      });

      return {
        labels,
        datasets
      };
    },

    async fetchLatestDoneTask() {
      try {
        const response = await fetch('http://localhost:3000/stats/latest/done/task');
        const data = await response.json();
        if (data.length > 0) {
          this.latestDoneTask = data[0];
        }
      } catch (error) {
        console.error('Fehler beim Abrufen der neuesten erledigten Aufgabe:', error);
      }
    },

  },

  created() {
    this.fetchGroups();
    this.fetchAllStatistics();
  },

};
</script>

<style scoped>

</style>