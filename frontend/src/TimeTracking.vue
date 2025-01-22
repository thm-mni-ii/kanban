<template>
  <div>
    
    <!-- Add/Edit Form -->
    <add-edit-time
      v-if="isAdding"
      @add-entry="addEntry"
      @cancel="isAdding = false"
    />

    <!-- Time Overview Table -->
     <time-overview :entries="entries" />
   

    <!-- Add New Entry Button -->
    <button @click="isAdding = true">Neuen Eintrag hinzufügen</button>
  </div>
</template>

<script>
import AddEditTime from "./components/AddEditTime.vue";

import TimeOverview from "./components/TimeOverview.vue";
import { useTimeTrackingStore } from "./store/timeTracking";

export default {
  components: { AddEditTime, TimeOverview, useTimeTrackingStore},
  data() {
    return {
      isAdding: false, // Steuerung des Add/Edit Formulars
    };
  },
  computed: {
    entries() {
      return TimeTracking.entries;
    }
  },
  methods: {
    addEntry(newEntry) {
      this.entries.push(newEntry); // Neuen Eintrag einfügen
      this.isAdding = false; // Formular ausblenden
    },

    editEntry(updatedEntry, index){
      this.entries.splice(index,1,updatedEntry);  // Eintrag aktualisieren

    },
    deleteEntry(index) {
      this.entries.splice(index, 1); // Eintrag löschen
    },
  },
};
</script>
