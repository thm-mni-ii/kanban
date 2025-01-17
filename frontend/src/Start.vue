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
      <v-container>
        <!-- Button zur Navigation -->
        <v-btn color="primary" @click="goToStatistics">Zu den Statistiken</v-btn>
      </v-container>
      <!-- Diagramm für Tasks per Group -->
      <BarChart v-if="chartData" :data="chartData" :options="chartOptions" />
      <!-- Diagramm für Tasks Done in Percent -->
      <BarChart v-if="donePercentChartData" :data="donePercentChartData" :options="chartOptions" />
      <!-- Diagramm für Tasks per Label -->
      <BarChart v-if="taskPerLabelChartData" :data="taskPerLabelChartData" :options="chartOptions" />
      <!-- Diagramm für Tasks by Member -->
      <BarChart v-if="tasksByMemberChartData" :data="tasksByMemberChartData" :options="chartOptions" />
      <!-- Button, um die latest done task zu laden -->
      <v-btn color="primary" @click="toggleLatestDoneTask">{{ latestDoneTask ? 'Hide' : 'Show' }} Latest Done Task</v-btn>
      <!-- Die latest done task -->
      <div v-if="latestDoneTask">
        <h2>Zuletzt erledigte Aufgabe:</h2>
        <p><strong>Task id</strong> {{ latestDoneTask.kantask_id }}</p>
        <p><strong>Name:</strong> {{ latestDoneTask.name }}</p>
        <p><strong>Beschreibung:</strong> {{ latestDoneTask.description }}</p>
        <p><strong>Fälligkeitsdatum:</strong> {{ latestDoneTask.due_date }}</p>
        <p><strong>Erledigt am:</strong> {{ latestDoneTask.done_time }}</p>
      </div>
      <!-- Diagramm für Tasks by Group -->
      <BarChart v-if="chartVisible && tasksByGroupChartData" :data="tasksByGroupChartData" :options="chartOptions" />
      <!-- Eingabefeld für Task by Group -->
      <v-text-field
          label="Group ID"
          v-model="groupId"
          type="number"
          placeholder="Enter Group ID"
          @keyup.enter="toggleChartVisibility"
      />
      <!-- Button, um das Diagramm Task by Group anzuzeigen/auszublenden -->
      <v-btn color="primary" @click="toggleChartVisibility"> {{ chartVisible ? 'Hide' : 'Show' }} Tasks for Group </v-btn>

      <!-- Diagramm für Tasks per Member -->
      <!-- <BarChart v-if="memberChartVisible && tasksPerMemberChartData" :data="tasksPerMemberChartData" :options="chartOptions"/> -->
      <!-- Eingabefeld für Tasks per Member -->
      <!-- <v-text-field
          label="Group ID"
          v-model="memberGroupId"
          type="number"
          placeholder="Enter Group ID"
          @keyup.enter="toggleMemberChartVisibility"
      />
      -->
      <!-- Button, um das Diagramm Tasks per Member anzuzeigen/auszublenden -->
      <!-- <v-btn color="primary" @click="toggleMemberChartVisibility">{{ memberChartVisible ? 'Hide' : 'Show' }} Tasks per Member</v-btn> -->
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
      latestDoneTask: null,           // Daten für die letzte erledigte Aufgabe
      tasksByMemberChartData: null,   // Daten für das "Tasks by Member"-Diagramm
      tasksByGroupChartData: null,    // Daten für das "Tasks by Group"-Diagramm
      groupId: '',                    // Dynamische Eingabe für die Gruppen-ID
      chartVisible: false,            // Steuert, ob das Diagramm angezeigt wird oder nicht
      memberGroupId: '',              // Eingabe für die Gruppen-ID der Mitglieder
      tasksPerMemberChartData: null,  // Daten für das "Tasks per Member"-Diagramm
      memberChartVisible: false,      // Steuert, ob das Diagramm angezeigt wird oder nicht
      items: [],                      // Gruppen-Items
      mockData: [],                   // Dummy-Daten für Gruppenmitglieder
      groupSelected: null,            // Ausgewählte Gruppe
      selectedGroupMembers: [],       // Mitglieder der ausgewählten Gruppe
      chartData: null,                // Daten für das Diagramm

      // Optionen für alle Diagramme, einschließlich spezifischer Optionen für Liniendiagramme
      chartOptions: {
        scales: {
          y: {
            beginAtZero: true,        // Y-Achse beginnt bei 0
            title: {
              display: true,
              text: 'Completed Tasks', // Beschriftung der Y-Achse
            }
          },
          x: {
            title: {
              display: true,
            }
          }
        },
        plugins: {
          legend: {
            display: true,            // Legende anzeigen
            position: 'top',          // Legende oben rechts platzieren
            align: 'end',             // Legende am rechten Rand
            labels: {
              usePointStyle: true,    // Punkte neben Texten in der Legende
            }
          }
        }
      }
    };
  },
  computed: {
    isStart() {
      return this.$route.path === "/";
    },
  },
  created() {
    // API-Daten werden geladen, sobald die Komponente erstellt wird
    this.fetchChartData();              // API-Abfrage für "Tasks per Group"
    this.fetchDonePercentData();        // API-Abfrage für "Tasks Done in Percent"
    this.fetchTaskDataPerLabel();       // API-Abfrage für "Tasks per Label"
    // this.fetchLatestDoneTask();         // API-Abfrage für die neueste erledigte Aufgabe (wird wahrscheinlich nicht benötigt, da Daten erst nach button klick angezeigt werden)
    this.fetchTasksByMember();          // Daten beim Laden der Seite abrufen

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

  watch: {
    // Beobachte Änderungen an der groupId und blende das Diagramm aus, wenn es angezeigt wird
    groupId(newGroupId, oldGroupId) {
      if (newGroupId !== oldGroupId && this.chartVisible) {
        this.chartVisible = false;  // Diagramm ausblenden, wenn eine neue Gruppen-ID eingegeben wurde
      }
    }
  },

  methods: {
    selectGroup(groupId) {
      this.groupSelected = groupId;
      const group = this.items.find((item) => item.group === groupId);
      this.selectedGroupMembers = this.mockData.filter((member) =>
          group.members.includes(member.id)
      );
    },

    goToStatistics() {
      this.$router.push({ name: 'Statistics' }); // Navigation zur Statistik-Seite
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

    // Methode zum Abrufen der erledigten Aufgaben in Prozent
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


// Methode zum Abrufen der neuesten erledigten Aufgabe
    async fetchLatestDoneTask() {
      // Setze die Anzeige der Aufgabe zurück, um alte Daten zu entfernen, bevor neue geladen werden
      this.latestDoneTask = null;

      try {
        const response = await fetch('http://localhost:3000/stats/latest/done/task');

        if (!response.ok) {
          throw new Error('Fehler beim Abrufen der Daten');
        }

        const data = await response.json();

        // Überprüfe, ob die Daten korrekt geladen wurden
        console.log("Rohdaten von der Latest Done Task API:", data);

        // Da es sich nur um einen Eintrag handelt, können wir direkt die erste Zeile verwenden
        if (data.length > 0) {
          this.latestDoneTask = data[0];  // Speichere den neuesten Task
        } else {
          console.warn("Keine gültigen Daten erhalten.");
        }

        console.log("Letzte erledigte Aufgabe:", this.latestDoneTask);

      } catch (error) {
        console.error('Fehler beim Abrufen der neuesten erledigten Aufgabe:', error);
      }
    },
    toggleLatestDoneTask() {
      if (this.latestDoneTask) {
        this.latestDoneTask = null;  // Verstecke die Aufgabe, wenn sie schon angezeigt wird
      } else {
        this.fetchLatestDoneTask();  // Lade die Aufgabe, wenn sie nicht angezeigt wird
      }
    },



   // Methode zum anzeigen der erledigten Aufgaben angezeigt nach Datum und sortiert nach Gruppen
    async fetchTasksByMember() {
      try {
        const response = await fetch('http://localhost:3000/stats/tasks/by/member');

        if (!response.ok) {
          throw new Error('Fehler beim Abrufen der Daten');
        }

        const data = await response.json();

        // Überprüfe, ob die Daten korrekt geladen wurden
        console.log("Rohdaten von der Tasks by Member API:", data);

        // Verarbeite die Daten in ein Chart.js-kompatibles Format
        if (data.length > 0) {
          this.tasksByMemberChartData = this.formatTasksByMemberData(data);
        } else {
          console.warn("Keine gültigen Daten erhalten.");
        }

        console.log("Tasks by Member Chart Data:", this.tasksByMemberChartData);

      } catch (error) {
        console.error('Fehler beim Abrufen der Tasks by Member:', error);
      }
    },
    formatTasksByMemberData(data) {
      // Gruppiere Daten nach `group_id`
      const groupedData = data.reduce((acc, item) => {
        const groupId = item.group_id;
        if (!acc[groupId]) acc[groupId] = [];
        acc[groupId].push({ date: item.day, task_count: item.completed_tasks });
        return acc;
      }, {});

      // Generiere Labels (x-Achse) anhand der Datumswerte und sortiere diese
      const labels = [...new Set(data.map(item => item.day))].sort();

      // Erstelle Datasets für jede Gruppe mit einer eigenen Farbe
      const datasets = Object.keys(groupedData).map((groupId, index) => {
        const color = `hsl(${(index * 65) % 360}, 70%, 50%)`; // Unterschiedliche Farben für Gruppen
        return {
          label:`Group ${groupId}`,
          data: labels.map(labelDate => {
            const dataPoint = groupedData[groupId].find(point => point.date === labelDate);
            return dataPoint ? dataPoint.task_count : 0; // 0 setzen, wenn keine Daten für das Datum vorhanden sind
          }),
          borderColor: color,
          backgroundColor: color,
          fill: false, // Keine Füllung unterhalb der Linie
          tension: 0.1, // Leichte Krümmung der Linie
          pointRadius: 4, // Größere Punkte
          pointHoverRadius: 6, // Größere Hoverpunkte
        };
      });

      return {
        labels, // x-Achse: Datumswerte
        datasets // Daten: eine Linie für jede Gruppe
      };
    },

    async fetchTasksByGroup(groupId) {
      try {
        const response = await fetch(`http://localhost:3000/stats/tasks/by/group/${groupId}`);

        if (!response.ok) {
          throw new Error('Fehler beim Abrufen der Daten');
        }

        const data = await response.json();

        // Überprüfe, ob die Daten korrekt geladen wurden
        console.log(`Rohdaten von der Tasks by Group API (Group ID: ${groupId}):`, data);

        // Verarbeite die Daten in ein Chart.js-kompatibles Format
        if (data.length > 0) {
          this.tasksByGroupChartData = this.formatTasksByGroupData(data);
        } else {
          console.warn("Keine gültigen Daten erhalten.");
        }

        console.log("Tasks by Group Chart Data:", this.tasksByGroupChartData);

      } catch (error) {
        console.error('Fehler beim Abrufen der Tasks by Group:', error);
      }
    },
    // Methode, um das Diagramm ein- oder auszublenden
    // ---Wichtig--- Methode so bearbeiten, dass mit einem klick auf den button das Diagramm direkt auktualieisrt wird, sobald eine neue zahl eingegeben wird
    toggleChartVisibility() {
      if (!this.groupId) {  // Überprüfen, ob groupId vorhanden ist
        console.warn('Bitte geben Sie eine gültige Gruppen-ID ein.');
        return;
      }

      this.chartVisible = !this.chartVisible;  // Umschalten der Sichtbarkeit des Diagramms

      if (this.chartVisible) {  // Nur wenn das Diagramm angezeigt wird, Daten laden
        this.fetchTasksByGroup(this.groupId);
      } else {
        this.tasksByGroupChartData = null;  // Leere die Chart-Daten, wenn ausgeblendet wird
        this.groupId = '';  // Leere das Eingabefeld, wenn das Diagramm ausgeblendet wird
      }
    },
    formatTasksByGroupData(data) {
      return {
        labels: ['Completed Tasks', 'Pending Tasks'],  // Kategorien
        datasets: [
          {
            label: `Group ${data[0].group_id} Tasks`,
            data: [data[0].completed_tasks, data[0].pending_tasks],  // Erledigte und Anstehende Aufgaben
            backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
            borderWidth: 1
          }
        ]
      };
    },
/*
    // Benutzbar erst sobald es Daten für diese Tabelle gibt
    // evtl muss noch bei der methode getTasksPerMember im controller.js das results bei res.status in der gleichen Methode zu results.rows geändert werden
    // Bei Templet in start.vue muss auch das Diagramm und der Button auskommentiert werden, wenn man den code abschnitt wieder verwenden möchte
    async fetchTasksPerMember(groupId) {
      try {
        const response = await fetch(`http://localhost:3000/stats/tasks/by/member/${groupId}`);
        if (!response.ok) {
          throw new Error('Fehler beim Abrufen der Daten');
        }

        const data = await response.json();

        // Überprüfe, ob die Daten korrekt geladen wurden
        console.log("Rohdaten von der Tasks by Member API:", data);

        // Daten für das Diagramm formatieren
        if (data.length > 0) {
          this.tasksPerMemberChartData = this.formatTasksPerMemberData(data);
        } else {
          console.warn("Keine gültigen Daten erhalten.");
        }

      } catch (error) {
        console.error('Fehler beim Abrufen der Tasks per Member:', error);
      }
    },
    // Methode, um das Diagramm ein- oder auszublenden
    toggleMemberChartVisibility() {
      if (!this.memberGroupId) {  // Überprüfen, ob memberGroupId vorhanden ist
        console.warn('Bitte geben Sie eine gültige Gruppen-ID ein.');
        return;
      }

      this.memberChartVisible = !this.memberChartVisible;  // Umschalten der Sichtbarkeit des Diagramms

      if (this.memberChartVisible) {  // Nur wenn das Diagramm angezeigt wird, Daten laden
        this.fetchTasksPerMember(this.memberGroupId);
      } else {
        this.tasksPerMemberChartData = null;  // Leere die Chart-Daten, wenn ausgeblendet wird
        this.memberGroupId = '';  // Leere das Eingabefeld, wenn das Diagramm ausgeblendet wird
      }
    },
    formatTasksPerMemberData(data) {
      return {
        labels: data.map(item => `User ${item.user_id}`),  // User-ID als Label
        datasets: [
          {
            label: 'Tasks per Member',
            data: data.map(item => item.task_count),  // Anzahl der Aufgaben
            backgroundColor: 'rgba(153, 102, 255, 0.2)',  // Balkenfarbe
            borderColor: 'rgba(153, 102, 255, 1)',       // Rahmenfarbe
            borderWidth: 1
          }
        ]
      };
    },
*/
  },
};
</script>

<style scoped></style>
