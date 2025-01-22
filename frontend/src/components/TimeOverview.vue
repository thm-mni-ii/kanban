<template>
  <div>
    <h2>Übersicht : {{ store.currentView }}</h2>

    <!--Ansicht wechsen-->
    <label for="view-select">Ansicht:</label>
    <select v-model="selectedView" @change="changeView">
      <option value="week">Wochenansicht</option>
      <option value="month">Monatsansicht</option>
      <option value="year">Jahresansicht</option>
    </select>

    <!--Dynamische Ansicht der Anzeige -->
    <div v-if="selectedView ==='week'">
      <h4>Wochenübersicht</h4>
      <table>
        <thead>
          <tr>
            <th v-for="day in daysOfWeek" :key="day">{{ day }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td v-for="day in daysOfWeek" :key="day">
              <div v-for="entry in getEntriesForDay(day)" :key="entry.date">
                <time-card
                :date="entry.date"
                :start-time="entry.startTime"
                :end-time="entry.endTime"
                :description="entry.description"
                />

              </div>
              <div v-for="entry in getEntriesForDay(day)" :key="entry.id">
                <TimeCard :entry="entry" @delete="store.removeEntry(entry.id)" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  <div v-else-if="selectedView === 'month'">
    <h4>Monatsübersicht</h4>
    <p> Monatliche Ansicht muss noch implementiert werden</p>
  </div>

  <div v-else-if="selectedView === 'year'">
    <h4>Jahresübersicht</h4>
    <p> Jahresübersicht muss noch implementiert werden</p>
  </div>

  
  </div>
</template>


<script>
import {ref, computed} from 'vue';
import { useTimeTrackingStore } from '@/store/timeTracking';
import TimeCard from './TimeCard.vue';

export default {
  components: {TimeCard},

  props: {
    entries: {
      type: Array,
      required: true
    }
  },

  setup(props) {
    
    const daysOfWeek = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag','Samstag','Sonntag'];

    const getEntriesForDay = (day) => {
      return props.entries.filter((entry) => entry.day === day);
    };

    return {daysOfWeek,getEntriesForDay};
  },
};
</script>

<!-- Für Omar, passe den Style nach belieben an und exkludiere style in eine gesonderte .js Datei-->
 <!--Dient erstmal nur als Beispiel-->

 <style scoped>

 table {
  width: 100%;
  border-collapse: collapse;
 }

 th,td {
  border: 1px solid #ddd;
  padding: 10px;
  vertical-align: top;
 }

 tr:hover {
  background-color: #f9f9f9;

 }


</style>