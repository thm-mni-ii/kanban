<template>
  <div>
    
    <!-- Add/Edit Form -->
    <add-edit-time
      v-if="isAdding"
      :entry ="selectedEntry"
      @edit-entry="editEntry"
      @cancel="isAdding = false; selectedEntry = null"
    />
    <!-- Add New Entry Button -->
    <button @click="isAdding = true; selectedEntry = null">Neuen Eintrag hinzufügen</button>
    
    <!-- Time Overview Table -->
     <time-overview :entries="entries" />
   

  </div>
</template>


<script>
import AddEditTime from "./components/AddEditTime.vue";
import TimeOverview from "./components/TimeOverview.vue";
import { useTimeTrackingStore } from "./store/timeTracking";
import { computed,ref } from "vue";

export default {
  components: { AddEditTime, TimeOverview},

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

    const startEditing = (entry) => {
      selectedEntry.value = {...entry};
      isAdding.value = true;
    }
   

    return {
      store,
      entries,
      isAdding,
      selectedEntry,
      isEditing,
      startEditing,
      addEntry,
      editEntry,
      
    }
  }

 
};
</script>
