<template>
  <div>
    
    <!-- Add/Edit Form -->
    <add-edit-time
      v-if="isAdding"
      @add-entry="addEntry"
      @cancel="isAdding = false"
    />

    <!-- List of Time Cards -->
    <time-card
      v-for="(entry, index) in entries"
      :key="index"
      :date="entry.date"
      :startTime="entry.startTime"
      :endTime="entry.endTime"
      :description="entry.description"
      @edit="editEntry($event, index)"
      @delete="deleteEntry(index)"
    />

    <!-- Add New Entry Button -->
    <button @click="isAdding = true">Neuen Eintrag hinzufügen</button>
  </div>
</template>

<script>
import AddEditTime from "./components/AddEditTime.vue";
import TimeCard from "./components/TimeCard.vue";

export default {
  components: { AddEditTime, TimeCard },
  data() {
    return {
      entries: [
        {
          date: "2024-12-15",
          startTime: "08:00",
          endTime: "12:45",
          description: "Meeting",
        },
        {
          date: "2024-12-16",
          startTime: "13:00",
          endTime: "17:00",
          description: "Project Work",
        },
      ],
      isAdding: false, // Control visibility of AddEditTime form
    };
  },
  methods: {
    addEntry(newEntry) {
      this.entries.push(newEntry); // Add the new entry to the array
      this.isAdding = false; // Hide the form
    },

    editEntry(updatedEntry, index){
      this.entries.splice(index,1,updatedEntry);  // Remove the entry at the given index

    },
    deleteEntry(index) {
      this.entries.splice(index, 1); // Remove the entry at the given index
    },
  },
};
</script>
