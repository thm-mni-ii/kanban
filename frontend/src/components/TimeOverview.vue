<template>
  <div>

   <!--Dynamische Ansicht der Anzeige -->
<div v-if="store.currentView ==='Woche'" >
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

    <div v-else-if="store.currentView === 'Monat'" class="month-wrapper">
      <!-- KEINE Monatsauswahl hier. Monat wird extern gesetzt (z. B. via store.setMonthRange). -->
      <div class="calendar">
        <!-- Kopfzeile: Mo–So -->
        <div class="calendar-row calendar-head">
          <div v-for="day in daysOfWeek" :key="day" class="calendar-cell head">{{ day }}</div>
        </div>

        <!-- Wochenraster -->
        <div v-for="(week, wIdx) in calendarWeeks" :key="'w' + wIdx" class="calendar-row">
          <div
            v-for="(cell, cIdx) in week"
            :key="'c' + wIdx + '-' + cIdx"
            class="calendar-cell day"
            :class="{ 'outside': !cell.inCurrentMonth, 'is-today': cell.isToday }"
          >
            <div class="day-header">
              <span class="day-number">{{ cell.date.getDate() }}</span>
            </div>

            <div class="entries">
              <div
                v-for="entry in store.groupedEntriesByMonth[cell.iso] || []"
                :key="entry.time_tracking_id || entry.id || entry.iso"
                class="entry-wrapper"
              >
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
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>


<script>
import { useTimeTrackingStore } from '@/store/timeTracking';
import TimeCard from './TimeCard.vue';
import { computed } from 'vue';
import WeekSelector from './selectors/WeekSelector-TimeTracking.vue';


export default {
  components: {TimeCard, WeekSelector },

  setup() {

    const store = useTimeTrackingStore();
    store.fetchEntries();


    const daysOfWeek = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag','Samstag','Sonntag'];
    
    const groupedEntriesByDay = computed(() => store.groupedEntriesByDay);

    //Gruppierte Einträge nach Tagen
    const getEntriesForDay = (day) => {
      return (store.entries??[]).filter((entry) => entry.day === day);
    };

    // Monat: sichtbarer Monat wird aus store.fromDate (bzw. heute) abgeleitet
    const pad = (n) => String(n).padStart(2, '0');
    const toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

    const currentMonthDate = computed(() => {
      const base = store.fromDate ? new Date(store.fromDate) : new Date();
      return new Date(base.getFullYear(), base.getMonth(), 1);
    });

    // 6x7 Raster, Montag als Wochenbeginn, keine lokale Monatsnavigation
    const calendarWeeks = computed(() => {
      const base = new Date(currentMonthDate.value.getFullYear(), currentMonthDate.value.getMonth(), 1);
      const firstDay = base.getDay(); // 0=So, 1=Mo, ...
      const mondayOffset = (firstDay + 6) % 7;
      const gridStart = new Date(base);
      gridStart.setDate(1 - mondayOffset);

      const todayISO = toISO(new Date());
      const out = [];
      for (let w = 0; w < 6; w++) {
        const week = [];
        for (let d = 0; d < 7; d++) {
          const cellDate = new Date(gridStart);
          cellDate.setDate(gridStart.getDate() + w * 7 + d);
          const iso = toISO(cellDate);
          week.push({
            date: cellDate,
            iso,
            inCurrentMonth: cellDate.getMonth() === base.getMonth(),
            isToday: iso === todayISO,
          });
        }
        out.push(week);
      }
      return out;
    });

    

    return {
      store,
      daysOfWeek,
      groupedEntriesByDay,
      getEntriesForDay,
      removeEntry: store.removeEntry,
      // Monat (steuerungslos)
      currentMonthDate,
      calendarWeeks,
    };
  },
};
</script>

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

th,
td {
  border: 1px solid #ddd;
  padding: 10px;
  min-width: 150px;
  vertical-align: top;
}

td:hover {
  background-color: #f9f9f9;
}

/* ===== Monatsansicht ===== */
.month-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.calendar {
  display: grid;
  grid-template-rows: auto repeat(6, 1fr);
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  overflow: hidden;
}

.calendar-row {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.calendar-cell {
  min-height: 130px; /* anpassbar */
  border-right: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
}

.calendar-row .calendar-cell:last-child { border-right: none; }
.calendar-row:last-child .calendar-cell { border-bottom: none; }

.calendar-cell.head {
  background: #fafafa;
  font-weight: 600;
  text-align: center;
}

.calendar-cell.day.outside { background: #fcfcfc; opacity: 0.7; }
.calendar-cell.day.is-today { outline: 2px solid #cfe3ff; outline-offset: -2px; }

.day-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 0.25rem;
}

.day-number {
  font-size: 0.875rem;
  font-weight: 600;
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 999px;
  padding: 0.1rem 0.5rem;
}

.entries {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  overflow: auto;
}

.entry-wrapper :deep(*) {
  /* Optional: TimeCard innerhalb der Zellen etwas kompakter darstellen */
}
</style>
