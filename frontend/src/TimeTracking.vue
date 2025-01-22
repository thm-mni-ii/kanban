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
import { ref } from "vue";

export default {
  components: { AddEditTime, TimeOverview},

  setup() {
    const store = useTimeTrackingStore();

    const addEntry = (entry) => store.addEntry(entry);
    const entries = store.entries;

    return {
      store,
      entries,
      addEntry,
      isAdding: ref(false),
    }
  }

 
};
</script>
