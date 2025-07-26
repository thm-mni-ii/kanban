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
          <h1>
            <select id="view-select" v-model="store.currentView" class="header-select">
              <option value="Woche">Wochenansicht</option>
              <option value="Monat">Monatsansicht</option>
              <option value="Jahr">Jahresansicht</option>
            </select>
          </h1>
      </div>

      <div v-if="store.currentView === 'Woche'" class="toolbar-center toolbar-section">
        <WeekSelector />
      </div>

      <div class="toolbar-right toolbar-section">
        <div>
          <label for="group">Gruppe:</label>
          <GroupSelector id="group" v-model="timeOverviewGroup"/>
        </div>
        <div>
          <button class="new-time-entry-btn" @click="isAdding = true; selectedEntry = null">
            <v-icon>mdi-plus</v-icon>
          </button>
        </div>
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
import { computed, ref, watch } from "vue";
import WeekSelector from './components/selectors/WeekSelector-TimeTracking.vue';
import GroupSelector from "./components/GroupSelector.vue";

export default {
  components: { AddEditTime, TimeOverview, WeekSelector, GroupSelector },

  setup() {
    const store = useTimeTrackingStore();

    const entries = computed(() => store.entries);
    const addEntry = (entry) => store.addEntry(entry);
    const editEntry = (updatedEntry) => {
      store.editEntry(updatedEntry);
    }
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
      console.log(`Store Group: ${newGroup}`);
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
</style>
