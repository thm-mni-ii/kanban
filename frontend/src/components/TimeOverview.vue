<template>
  <div>

    <!--Ansicht wechsen-->
  <h1>
    <select id="view-select" v-model="store.currentView" class="header-select">
      <option value="Woche">Wochenansicht</option>
      <option value="Monat">Monatsansicht</option>
      <option value="Jahr">Jahresansicht</option>
    </select>
  </h1>


   <!--Dynamische Ansicht der Anzeige -->
<div v-if="store.currentView ==='Woche'" >
  <WeekSelector />
  <!-- Neuer Wrapper um die Tabelle hinzufügen -->
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th v-for="day in daysOfWeek" :key="day">{{ day }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td v-for="day in daysOfWeek" :key="day">
            <!-- Karten für jeden Tag-->
            <div v-for="entry in groupedEntriesByDay[day]" :key="entry.date">
              <time-card
              
                :title="entry.title"
                :group_id="entry.group_id"
                :activity_start="entry.activity_start"
                :activity_duration="entry.activity_duration"
                :description="entry.description"
                :time_tracking_id="entry.time_tracking_id"
                @delete="removeEntry(entry.id)"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

  <div v-else-if="store.currentView === 'Monat'">
    <h4>Monatsübersicht</h4>
    <p> Monatliche Ansicht muss noch implementiert werden</p>
  </div>

  <div v-else-if="store.currentView === 'Jahr'">
    <h4>Jahresübersicht</h4>
    <p> Jahresübersicht muss noch implementiert werden</p>
  </div>

  
  </div>
</template>


<script>
import { useTimeTrackingStore } from '@/store/timeTracking';
import TimeCard from './TimeCard.vue';
import { computed } from 'vue';
import WeekSelector from './selectors/WeekSelector-TimeTracking.vue';


export default {
  components: {TimeCard, WeekSelector},

  setup() {

    const store = useTimeTrackingStore();
    store.fetchEntries();
    
    const daysOfWeek = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag','Samstag','Sonntag'];

    const groupedEntriesByDay = computed(() => store.groupedEntriesByDay);

    //Gruppierte Einträge nach Tagen
    const getEntriesForDay = (day) => {
      return (store.entries??[]).filter((entry) => entry.day === day);
    };

    return {
      store,
      daysOfWeek,
      groupedEntriesByDay,
      getEntriesForDay,
      removeEntry: store.removeEntry,
    };
  },
};
</script>

<!-- Für Omar, passe den Style nach belieben an und exkludiere style in eine gesonderte .js Datei-->
 <!--Dient erstmal nur als Beispiel-->

 <style scoped>

 .table-container {
  width: 100%;
  overflow: auto;
  white-space: nowrap;
  margin-top: 0.5rem;
 }

 table {
  width: 100%;
  min-width: 1000px;
  border-collapse: collapse;
 }

 th,td {
  border: 1px solid #ddd;
  padding: 10px;
  min-width: 150px;
  vertical-align: top;
 }

 tr:hover {
  background-color: #f9f9f9;

 }

 .header-select {
  font-size: 1.3rem;
  font-weight: bold;
  padding: 0.75rem 1.5rem;
  border: 2px solid #ccc;
  border-radius: 6px;
  background-color: #f9f9f9;
  color: #333;
  appearance: none; /* optional: remove default OS styling */
  outline: none;
  cursor: pointer;
  max-width: 100%;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}

.header-select:hover {
  border-color: #999;
  background-color: #f0f0f0;
}


</style>