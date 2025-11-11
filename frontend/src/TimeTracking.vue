<template>
  <!-- <div class="topic-header-dark">
    <h1>Arbeitszeiterfassung</h1>
  </div> -->
  <div>
    <!-- Add/Edit Form -->
    <add-edit-time v-if="isAdding" :entry="selectedEntry" @edit-entry="editEntry"
      @cancel="isAdding = false; selectedEntry = null" />

    <!--Ansicht wechsen-->
    <div class="toolbar">
      <div class="toolbar-left toolbar-section">
        <select id="view-select" v-model="store.currentView" class="header-select">
          <option value="Woche">Wochenansicht</option>
          <option value="Monat">Monatsansicht</option>
        </select>
      </div>

      <div v-if="store.currentView === 'Woche'" class="toolbar-center toolbar-section">
        <WeekSelector />
      </div>
      <div v-if="store.currentView === 'Monat'" class="toolbar-center toolbar-section">
        <MonthSelector />
      </div>

      <div class="toolbar-right toolbar-section">
        <table class="time-summary">
          <thead>
            <tr>
              <th></th>
              <th>Gesamt</th>
              <th>Angezeigt</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>🧍 Ich</td>
              <td>{{ formatHoursToTimeString(myTotalHours) }}</td>
              <td>{{ formatHoursToTimeString(myDisplayedHours) }}</td>
            </tr>
            <tr v-if="hasOtherGroupMembers">
              <td>👥 Andere</td>
              <td>{{ formatHoursToTimeString(otherGroupMembersTotalHours) }}</td>
              <td>{{ formatHoursToTimeString(othersDisplayedHours) }}</td>
            </tr>
            <tr v-if="hasOtherGroupMembers">
              <td>📊 Gruppe</td>
              <td>{{ formatHoursToTimeString(groupTotalHours) }}</td>
              <td>{{ formatHoursToTimeString(displayedGroupHours) }}</td>
            </tr>
          </tbody>
        </table>

        <GroupSelector id="group" v-model="timeOverviewGroup" class="header-select" />
        <button class="new-time-entry-btn" @click="isAdding = true; selectedEntry = null">
          <v-icon>mdi-plus</v-icon>
        </button>
      </div>
    </div>

    <!-- Time Overview Table -->
    <time-overview :entries="entries" />


  </div>
</template>


<script>
import AddEditTime from "./components/AddEditTime.vue";
import TimeOverview from "./components/TimeOverview.vue";
import { useTimeTrackingStore } from "./store/timeTracking";
import { computed, ref, watch, onMounted } from "vue";
import WeekSelector from './components/selectors/WeekSelector-TimeTracking.vue';
import MonthSelector from "./components/selectors/MonthSelector-TimeTracking.vue";
import GroupSelector from "./components/GroupSelector.vue";
import { UserService } from '@/lib/user.service';

export default {
  components: { AddEditTime, TimeOverview, WeekSelector, GroupSelector, MonthSelector },

  setup() {
    const store = useTimeTrackingStore();
    const currentUserId = ref(null);

    onMounted(async () => {
      const user = await UserService.getCurrentUser();
      currentUserId.value = user.id;
    });


    const entries = computed(() => store.entries);

    function parseDurationToHours(durationStr) {
      if (!durationStr) return 0;
      const [hours, minutes, seconds] = durationStr.split(":").map(Number);
      return hours + minutes / 60 + seconds / 3600;
    }

    const hasOtherGroupMembers = computed(() =>
      currentUserId.value !== null &&
      store.entries.some(entry => entry.user_id !== currentUserId.value)
    );

    function formatHoursToTimeString(decimalHours) {
      const totalSeconds = Math.round(decimalHours * 3600);

      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      // Pad with leading zeros if needed
      const pad = (n) => n.toString().padStart(2, '0');
      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }


    const addEntry = (entry) => store.addEntry(entry);
    const editEntry = (updatedEntry) => {
      store.editEntry(updatedEntry);
    }

    const groupTotalHours = computed(() =>
      store.entries
        .reduce((sum, entry) => sum + parseDurationToHours(entry.activity_duration), 0)
    );

    const myTotalHours = computed(() =>
      store.entries
        .filter(entry => entry.user_id === currentUserId.value)
        .reduce((sum, entry) => sum + parseDurationToHours(entry.activity_duration), 0)
    );

    const otherGroupMembersTotalHours = computed(() =>
      store.entries
        .filter(entry => entry.user_id !== currentUserId.value)
        .reduce((sum, entry) => sum + parseDurationToHours(entry.activity_duration), 0)
    );

    const displayedGroupHours = computed(() => {
      const from = new Date(store.fromDate);
      const to = new Date(store.toDate);

      return store.entries
        .filter(entry => {
          const date = new Date(entry.activity_start);
          return date >= from && date <= to;
        })
        .reduce((sum, entry) => sum + parseDurationToHours(entry.activity_duration), 0);
    });

    const myDisplayedHours = computed(() => {
      const from = new Date(store.fromDate);
      const to = new Date(store.toDate);

      return store.entries
        .filter(entry => {
          const date = new Date(entry.activity_start);
          return date >= from && date <= to && entry.user_id === currentUserId.value;
        })
        .reduce((sum, entry) => sum + parseDurationToHours(entry.activity_duration), 0);
    });

    const othersDisplayedHours = computed(() => {
      const from = new Date(store.fromDate);
      const to = new Date(store.toDate);

      return store.entries
        .filter(entry => {
          const date = new Date(entry.activity_start);
          return date >= from && date <= to && entry.user_id !== currentUserId.value;
        })
        .reduce((sum, entry) => sum + parseDurationToHours(entry.activity_duration), 0);
    });



    const selectedEntry = ref(null);
    const isEditing = computed(() => selectedEntry.value !== null);
    const isAdding = ref(false);
    const timeOverviewGroup = ref(-1);

    const startEditing = (entry) => {
      selectedEntry.value = { ...entry };
      isAdding.value = true;
    }

    // react to group change
    watch(timeOverviewGroup, (newGroup, oldGroup) => {
      store.setCurrentGroup(newGroup);
      store.fetchEntries()
      // Beispiel: store.filterByGroup(newGroup);
    });


    return {
      store,
      entries,
      isAdding,
      selectedEntry,
      isEditing,
      startEditing,
      addEntry,
      editEntry,
      timeOverviewGroup,
      onMounted,
      currentUserId,
      hasOtherGroupMembers,
      parseDurationToHours,
      formatHoursToTimeString,
      groupTotalHours,
      myTotalHours,
      otherGroupMembersTotalHours,
      displayedGroupHours,
      myDisplayedHours,
      othersDisplayedHours

    }
  },


};
</script>
<style scoped>
/* Floating Add Button */
.new-time-entry-btn {
  background-color: #10b981;
  border: none;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
  color: white;
  font-size: 24px;
}

.new-time-entry-btn:hover {
  background-color: #059669;
}

/* Entire toolbar row */
.toolbar {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
}

/* WeekSelector block */
.toolbar-center {
  flex: 1 1 100%;
  /* Force to new line when needed */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;
  order: 3
}

.toolbar-section {
  flex: 1 1 33%;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.toolbar-left {
  order: 1;
  justify-content: flex-start;
}

.toolbar-right {
  order: 2;
  justify-content: flex-end;
}

/* Header select dropdown */
.header-select {
  font-size: 1.3rem;
  font-weight: bold;
  padding: 0.75rem 1.5rem;
  border: 2px solid #ccc;
  border-radius: 6px;
  background-color: #f9f9f9;
  color: #333;
  appearance: none;
  outline: none;
  cursor: pointer;
  max-width: 100%;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.header-select:hover {
  border-color: #999;
  background-color: #f0f0f0;
}

/* ✅ Only on wide screens, prevent WeekSelector from wrapping */
@media (min-width: 750px) {
  .toolbar {
    flex-wrap: nowrap;
  }

  .toolbar-center {
    flex: 1;
    margin-top: 0;
    justify-content: center;
  }

  .toolbar-left {
    order: 1;
  }

  .toolbar-right {
    order: 3;
  }

  .toolbar-center {
    order: 2;
  }
}

.topic-header-dark {
  background-color: #2d2d2d;
  /* dark grey */
  padding: 1rem 2rem;
  text-align: center;
  color: white;
  width: 100%;
  border-bottom: 1px solid #444;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
}

.topic-header-dark h1 {
  font-size: 1.6rem;
  margin: 0;
  font-weight: 500;
}

.header-select.small {
  font-size: 1.1rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border: 2px solid #ccc;
  border-radius: 6px;
  background-color: #f9f9f9;
  color: #333;
  appearance: none;
  outline: none;
  cursor: pointer;
  height: 40px;
  min-width: 160px;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 140 140' width='12' height='12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolyline points='20,40 70,90 120,40' fill='none' stroke='%23666' stroke-width='14' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 0.75rem;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}

.time-summary {
  border-collapse: collapse;
  font-size: 0.85rem;
  min-width: 240px;
}

.time-summary th,
.time-summary td {
  padding: 0.25rem 0.5rem;
  text-align: right;
}

.time-summary th:first-child,
.time-summary td:first-child {
  text-align: left;
}
</style>
